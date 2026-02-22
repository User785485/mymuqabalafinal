import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  getCorsHeaders,
  errorResponse,
  jsonResponse,
  RateLimiter,
  getClientIp,
} from "../_shared/cors.ts";

const limiter = new RateLimiter(20, 60_000);

Deno.serve(async (req: Request) => {
  const CORS = getCorsHeaders(req);
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST")
    return errorResponse("Method not allowed", 405, CORS);
  if (!limiter.check(getClientIp(req)))
    return errorResponse("Rate limited", 429, CORS);

  try {
    const { filePath, telephone, code } = await req.json();
    if (!filePath) return errorResponse("Missing filePath", 400, CORS);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Verify client access if credentials provided
    if (telephone && code) {
      const { data } = await admin.rpc("verify_client_access", {
        p_telephone: telephone,
        p_code: code,
      });
      if (!data) return errorResponse("Access denied", 403, CORS);
    }

    // Download audio from bucket
    const { data: fileData, error: dlError } = await admin.storage
      .from("form-audio")
      .download(filePath);
    if (dlError || !fileData)
      return errorResponse("File not found", 404, CORS);

    // Transcribe via OpenAI Whisper
    const openaiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiKey)
      return errorResponse("Transcription not configured", 500, CORS);

    const formData = new FormData();
    formData.append("file", fileData, filePath.split("/").pop());
    formData.append("model", "whisper-1");
    formData.append("language", "fr");

    const whisperRes = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${openaiKey}` },
        body: formData,
      }
    );

    if (!whisperRes.ok) {
      const err = await whisperRes.text();
      return errorResponse("Transcription failed", 502, CORS, err);
    }

    const result = await whisperRes.json();
    return jsonResponse({ text: result.text }, 200, CORS);
  } catch (e) {
    return errorResponse("Internal error", 500, CORS, e);
  }
});
