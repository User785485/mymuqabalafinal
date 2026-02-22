
import { useState, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { DropZone } from "./DropZone";
import { TranscriptionHistory } from "./TranscriptionHistory";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";
import { Loader2, AlertTriangle, Download, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const SUPPORTED_FORMATS = {
  'audio/flac': ['.flac'],
  'audio/m4a': ['.m4a'],
  'audio/mpeg': ['.mp3', '.mpeg', '.mpga'],
  'audio/ogg': ['.oga', '.ogg'],
  'audio/wav': ['.wav'],
  'audio/webm': ['.webm'],
  'video/mp4': ['.mp4'],
  'audio/opus': ['.opus']
};

// Définition de la taille maximale pour l'API Whisper (25MB)
const MAX_FILE_SIZE = 25 * 1024 * 1024;

export function TranscriptionUploader() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [transcriptionText, setTranscriptionText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Validation du support du navigateur pour les API nécessaires
  useEffect(() => {
    // Vérification du support FileReader
    if (typeof FileReader === 'undefined') {
      setError("Votre navigateur ne prend pas en charge la lecture de fichiers. Veuillez utiliser un navigateur moderne.");
      toast({
        variant: "destructive",
        title: "Navigateur non compatible",
        description: "Veuillez utiliser un navigateur plus récent comme Chrome, Firefox ou Edge.",
      });
    }
  }, []);

  const handleUpload = async (files: File[]) => {
    console.log("🎯 Starting upload process with files:", files.map(f => ({ name: f.name, size: f.size, type: f.type })));
    setIsUploading(true);
    setUploadProgress(0);
    setError(null);
    setTranscriptionText(null);

    try {
      if (files.length === 0) {
        throw new Error("Aucun fichier sélectionné");
      }

      const file = files[0];
      setCurrentFile(file);

      // Vérification de la taille du fichier
      if (file.size > MAX_FILE_SIZE) {
        throw new Error(`Le fichier est trop volumineux (${(file.size / (1024 * 1024)).toFixed(2)}MB). La limite est de 25MB. Utilisez la fonctionnalité de découpage pour les fichiers plus grands.`);
      }

      // Simuler un progrès d'upload plus réaliste
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.floor(Math.random() * 5) + 2; // Incrémenter entre 2 et 6 pour un sentiment de progrès naturel
        });
      }, 300);
      
      // Sanitize filename - remove non-ASCII characters and spaces
      const sanitizedFilename = file.name.replace(/[^\x00-\x7F]/g, '').replace(/\s+/g, '_');
      
      // Upload file to Supabase Storage with handling for network issues
      console.log("⬆️ Uploading file to storage...");
      const uploadPath = `uploads/${Date.now()}_${sanitizedFilename}`;
      
      // Test connection before starting upload
      try {
        await fetch(supabase.storageUrl + '/object/info/audio/' + uploadPath, { method: 'HEAD' })
          .catch(() => console.log('Storage connection check - expected 404, continuing with upload'));
      } catch (e) {
        console.log('Connectivity check error, proceeding anyway:', e);
      }
      
      let uploadAttempts = 0;
      const maxAttempts = 3;
      let uploadData;
      let uploadError;
      
      // Retry logic for upload
      while (uploadAttempts < maxAttempts) {
        try {
          const result = await supabase.storage
            .from("audio")
            .upload(uploadPath, file, { 
              cacheControl: '3600',
              upsert: false,
              contentType: file.type
            });
            
          uploadData = result.data;
          uploadError = result.error;
          
          if (!uploadError) break;
          
          uploadAttempts++;
          console.error(`Upload attempt ${uploadAttempts} failed:`, uploadError);
          await new Promise(resolve => setTimeout(resolve, 2000 * uploadAttempts));
        } catch (e) {
          uploadAttempts++;
          console.error(`Network error on attempt ${uploadAttempts}:`, e);
          await new Promise(resolve => setTimeout(resolve, 2000 * uploadAttempts));
        }
      }

      if (uploadError) {
        console.error("❌ Storage upload error after retries:", uploadError);
        throw new Error(`Erreur lors de l'upload de ${file.name}: ${uploadError.message}`);
      }

      console.log("✅ File uploaded successfully:", uploadData);
      setUploadProgress(95);

      // Call transcription function with error handling and retry
      console.log("🎙️ Starting transcription process...");
      let transcriptionAttempts = 0;
      let transcriptionError = null;
      let transcriptionData = null;
      
      while (transcriptionAttempts < maxAttempts && !transcriptionData) {
        try {
          const result = await supabase.functions
            .invoke("transcribe-simple", {
              body: { filePath: uploadPath },
            });
          
          transcriptionData = result.data;
          transcriptionError = result.error;
          
          if (!transcriptionError) break;
          
          transcriptionAttempts++;
          console.error(`Transcription attempt ${transcriptionAttempts} failed:`, transcriptionError);
          await new Promise(resolve => setTimeout(resolve, 2000 * transcriptionAttempts));
        } catch (e) {
          transcriptionAttempts++;
          console.error(`Network error on transcription attempt ${transcriptionAttempts}:`, e);
          await new Promise(resolve => setTimeout(resolve, 2000 * transcriptionAttempts));
        }
      }

      if (transcriptionError) {
        console.error("❌ Transcription error after retries:", transcriptionError);
        throw new Error(`Erreur lors de la transcription de ${file.name}: ${transcriptionError.message}`);
      }

      if (!transcriptionData?.transcription) {
        console.error("❌ No transcription data received");
        throw new Error(`Erreur: Aucune transcription reçue pour ${file.name}`);
      }

      console.log("✅ Transcription completed:", transcriptionData);
      setUploadProgress(100);
      setTranscriptionText(transcriptionData.transcription);

      // Save to history
      console.log("💾 Saving to history...");
      const { error: historyError } = await supabase
        .from("history")
        .insert({
          filename: file.name,
          file_path: uploadPath,
          transcription: transcriptionData.transcription,
          file_type: "transcription"
        });

      if (historyError) {
        console.error("❌ History save error:", historyError);
        toast({
          variant: "destructive",
          title: "Avertissement",
          description: `La transcription a réussi mais n'a pas pu être sauvegardée dans l'historique.`,
        });
      } else {
        // Invalidate the history cache to refresh the list
        queryClient.invalidateQueries({ queryKey: ['transcription-history'] });
      }

      toast({
        title: "Transcription terminée",
        description: `Le fichier ${file.name} a été transcrit avec succès.`,
      });

      clearInterval(progressInterval);
    } catch (error: any) {
      console.error("❌ Global error:", error);
      setError(error.message);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message,
      });
    } finally {
      console.log("🏁 Upload process completed");
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Nouvelle transcription</h2>
        <p className="text-muted-foreground">
          Déposez vos fichiers audio ou vidéo pour les transcrire automatiquement
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <DropZone 
        onDrop={handleUpload} 
        isUploading={isUploading}
        supportedFormats={SUPPORTED_FORMATS}
        maxSize={MAX_FILE_SIZE}
      />
      
      {isUploading && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Traitement en cours...</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}

      {transcriptionText && currentFile && (
        <Card>
          <CardHeader>
            <CardTitle>Transcription de {currentFile.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-md max-h-96 overflow-y-auto whitespace-pre-wrap">
              {transcriptionText}
            </div>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                if (transcriptionText) {
                  navigator.clipboard.writeText(transcriptionText);
                  toast({
                    description: "Transcription copiée dans le presse-papier",
                  });
                }
              }}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copier
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={() => {
                const blob = new Blob([transcriptionText || ''], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = currentFile.name.replace(/\.[^/.]+$/, '') + '.txt';
                document.body.appendChild(a);
                a.click();
                URL.revokeObjectURL(url);
                document.body.removeChild(a);
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Télécharger
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <TranscriptionHistory />
    </div>
  );
}
