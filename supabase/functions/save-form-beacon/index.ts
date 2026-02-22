// ═══════════════════════════════════════════════════════════
//  MY MUQABALA — Save Form Beacon
//  Accepts navigator.sendBeacon POST for form progress save.
//  Public endpoint, validates via telephone + code.
// ═══════════════════════════════════════════════════════════

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  getCorsHeaders,
  errorResponse,
  jsonResponse,
  RateLimiter,
  getClientIp,
  isValidPhone,
} from "../_shared/cors.ts";

const limiter = new RateLimiter(60, 60_000); // 60 req/min

Deno.serve(async (req: Request) => {
  const cors = getCorsHeaders(req);

  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }

  if (req.method !== "POST") {
    return errorResponse("Method not allowed", 405, cors);
  }

  // Rate limiting
  const ip = getClientIp(req);
  if (!limiter.check(ip)) {
    return errorResponse("Too many requests", 429, cors);
  }

  try {
    const body = await req.json();
    const { telephone, code, form_id, step, answers } = body;

    // Validate required fields
    if (!telephone || !code || !form_id) {
      return errorResponse("Missing required fields", 400, cors);
    }

    if (!isValidPhone(telephone)) {
      return errorResponse("Invalid phone", 400, cors);
    }

    if (typeof step !== "number" || step < 0) {
      return errorResponse("Invalid step", 400, cors);
    }

    // Create Supabase admin client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // Verify client access via unified function
    const { data: clientId, error: clientErr } = await supabase
      .rpc("verify_client_access", {
        p_telephone: telephone,
        p_code: code,
      });

    if (clientErr || !clientId) {
      return errorResponse("Unauthorized", 401, cors);
    }

    // Save progress using the same RPC
    const { error: saveErr } = await supabase.rpc("save_form_progress", {
      p_telephone: telephone,
      p_code: code,
      p_form_id: form_id,
      p_step: step,
      p_answers: answers || {},
    });

    if (saveErr) {
      console.error("Beacon save error:", saveErr);
      return errorResponse("Save failed", 500, cors);
    }

    return jsonResponse({ success: true }, 200, cors);
  } catch (err) {
    return errorResponse("Invalid request", 400, cors, err);
  }
});
