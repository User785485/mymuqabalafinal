// src/utils/saveSystem.js
export const saveSystem = {
    saveState: (scriptId, state) => {
      try {
        const dataToSave = {
          ...state,
          scriptId,
          lastSaved: new Date().toISOString()
        };
        localStorage.setItem(`scriptState_${scriptId}`, JSON.stringify(dataToSave));
        return true;
      } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
        return false;
      }
    },
  
    loadState: (scriptId) => {
      try {
        const savedState = localStorage.getItem(`scriptState_${scriptId}`);
        if (savedState) {
          return JSON.parse(savedState);
        }
        return null;
      } catch (error) {
        console.error('Erreur lors du chargement:', error);
        return null;
      }
    },
  
    clearState: (scriptId) => {
      try {
        localStorage.removeItem(`scriptState_${scriptId}`);
        return true;
      } catch (error) {
        console.error('Erreur lors du nettoyage:', error);
        return false;
      }
    },
  
    getAllSavesForScript: (scriptId) => {
      try {
        const key = `scriptState_${scriptId}`;
        const savedState = localStorage.getItem(key);
        if (savedState) {
          return [{
            id: key,
            ...JSON.parse(savedState)
          }];
        }
        return [];
      } catch (error) {
        console.error('Erreur lors du chargement des sauvegardes:', error);
        return [];
      }
    },
  
    exportSaves: () => {
      const saves = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('scriptState_')) {
          try {
            saves[key] = JSON.parse(localStorage.getItem(key));
          } catch (e) {
            console.error('Erreur lors de l\'export:', e);
          }
        }
      }
      const blob = new Blob([JSON.stringify(saves, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `scripts_saves_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
  
    importSaves: async (file) => {
      try {
        const text = await file.text();
        const saves = JSON.parse(text);
        Object.entries(saves).forEach(([key, value]) => {
          if (key.startsWith('scriptState_')) {
            localStorage.setItem(key, JSON.stringify(value));
          }
        });
        return true;
      } catch (error) {
        console.error('Erreur lors de l\'import:', error);
        return false;
      }
    }
  };