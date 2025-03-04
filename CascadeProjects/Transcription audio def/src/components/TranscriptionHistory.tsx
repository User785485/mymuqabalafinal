import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Copy, Download, Trash2, Loader2, RefreshCcw, FileText } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface HistoryItem {
  id: string;
  filename: string;
  file_path: string;
  transcription: string | null;
  created_at: string;
  file_type: string;
}

export function TranscriptionHistory() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  // Utilisation de useQuery avec retry et placeholder data pour une meilleure UX
  const { data: historyItems, error: historyError, isLoading, isError, refetch } = useQuery({
    queryKey: ['transcription-history'],
    queryFn: async () => {
      console.log('🔍 Fetching transcription history...');
      try {
        const { data, error } = await supabase
          .from('history')
          .select('*')
          .eq('file_type', 'transcription')
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) {
          console.error('❌ Error fetching history:', error);
          throw error;
        }

        console.log('✅ History items fetched:', data);
        return data || [];
      } catch (error) {
        console.error('❌ Query error:', error);
        throw error;
      }
    },
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000),
    placeholderData: [], // Permet d'avoir un tableau vide au lieu de undefined pendant le chargement
    refetchOnWindowFocus: false,
    staleTime: 60000 // 1 minute avant de considérer les données comme obsolètes
  });

  const handleCopy = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      toast({
        description: "Texte copié dans le presse-papier",
      });
    } catch (err) {
      console.error("Erreur de copie:", err);
      toast({
        variant: "destructive",
        description: "Impossible de copier le texte. Votre navigateur ne supporte peut-être pas cette fonctionnalité.",
      });
    }
  };

  const handleDownload = async (filePath: string, filename: string) => {
    try {
      toast({
        description: "Téléchargement en cours...",
      });

      const { data, error } = await supabase.storage
        .from('audio')
        .download(filePath);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        description: "Fichier téléchargé avec succès",
      });
    } catch (error) {
      console.error('❌ Error downloading file:', error);
      toast({
        variant: "destructive",
        description: "Impossible de télécharger le fichier audio. Veuillez réessayer.",
      });
    }
  };

  // Fonction pour supprimer un élément
  const handleDelete = async (id: string) => {
    try {
      const itemToDelete = historyItems?.find(item => item.id === id);
      
      if (!itemToDelete) {
        throw new Error("Élément introuvable");
      }
      
      // Suppression de l'entrée dans la base de données
      const { error: dbError } = await supabase
        .from('history')
        .delete()
        .eq('id', id);
      
      if (dbError) throw dbError;
      
      // Optionnel: Suppression du fichier dans le storage (peut être conservé)
      // const { error: storageError } = await supabase.storage
      //   .from('audio')
      //   .remove([itemToDelete.file_path]);
      
      // if (storageError) {
      //   console.warn('⚠️ Fichier non supprimé du storage:', storageError);
      // }
      
      // Mise à jour de la liste
      queryClient.invalidateQueries({ queryKey: ['transcription-history'] });
      
      toast({
        description: "Élément supprimé de l'historique",
      });
    } catch (error) {
      console.error('❌ Error deleting item:', error);
      toast({
        variant: "destructive",
        description: "Erreur lors de la suppression. Veuillez réessayer.",
      });
    } finally {
      setDeleteItemId(null);
    }
  };

  // Gestion des états d'erreur et de chargement avec fallbacks
  if (isError && historyError) {
    console.error('🚨 Error loading history:', historyError);
    return (
      <Card>
        <CardHeader>
          <CardTitle>Historique des transcriptions</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-6">
          <div className="mb-4 text-destructive">
            <FileText className="h-12 w-12 mx-auto opacity-50 mb-2" />
            <p>Impossible de charger l'historique</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => refetch()}
            className="mx-auto"
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Réessayer
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Squelette de chargement
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Historique des transcriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fichier</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(3).fill(0).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-32" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Historique des transcriptions</span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => queryClient.invalidateQueries({ queryKey: ['transcription-history'] })}
            title="Rafraîchir l'historique"
          >
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fichier</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historyItems?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                  Aucune transcription dans l'historique
                </TableCell>
              </TableRow>
            ) : (
              historyItems?.map(item => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium truncate max-w-[200px]" title={item.filename}>
                    {item.filename}
                  </TableCell>
                  <TableCell>{format(new Date(item.created_at), 'dd MMMM yyyy', { locale: fr })}</TableCell>
                  <TableCell>
                    <div className="flex justify-end space-x-2">
                      <Button
                        onClick={() => item.transcription && handleCopy(item.transcription)}
                        size="sm"
                        variant="outline"
                        disabled={!item.transcription}
                        title="Copier la transcription"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDownload(item.file_path, item.filename)}
                        size="sm"
                        variant="outline"
                        title="Télécharger le fichier audio"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => setSelectedItem(item)}
                        size="sm"
                        variant="outline"
                        title="Voir la transcription"
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => setDeleteItemId(item.id)}
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:text-destructive"
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
      {historyItems && historyItems.length > 0 && (
        <CardFooter className="justify-end">
          <div className="text-xs text-muted-foreground">
            {historyItems.length} élément(s) dans l'historique
          </div>
        </CardFooter>
      )}

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={!!deleteItemId} onOpenChange={(open) => !open && setDeleteItemId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cet élément de l'historique ?
              Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => deleteItemId && handleDelete(deleteItemId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog pour afficher la transcription complète */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Transcription: {selectedItem?.filename}</DialogTitle>
            <DialogDescription>
              {selectedItem?.created_at && format(new Date(selectedItem.created_at), 'PPPp', { locale: fr })}
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-muted p-4 rounded-md max-h-[50vh] overflow-y-auto whitespace-pre-wrap">
            {selectedItem?.transcription || "Aucune transcription disponible"}
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => selectedItem?.transcription && handleCopy(selectedItem.transcription)}
              disabled={!selectedItem?.transcription}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copier
            </Button>
            <Button 
              variant="default"
              onClick={() => {
                if (selectedItem?.transcription) {
                  const blob = new Blob([selectedItem.transcription], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = selectedItem.filename.replace(/\.[^/.]+$/, '') + '.txt';
                  document.body.appendChild(a);
                  a.click();
                  URL.revokeObjectURL(url);
                  document.body.removeChild(a);
                }
              }}
              disabled={!selectedItem?.transcription}
            >
              <Download className="h-4 w-4 mr-2" />
              Télécharger en TXT
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}