const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static('public'));

// Route API Claude
app.post('/api/chat', async (req, res) => {
    console.log('Nouvelle requête chat reçue:', req.body);
    
    if (!process.env.CLAUDE_API_KEY) {
        return res.status(500).json({ 
            error: { message: 'Clé API non configurée' } 
        });
    }

    try {
        // Récupérer l'historique des messages s'il existe
        const messages = req.body.messages || [];
        
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.CLAUDE_API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: "claude-3-5-sonnet-20241022",
                max_tokens: 1024,
                messages: messages,
                temperature: 0.7,  // Ajout d'un peu de créativité
                system: "Tu es Claude, un assistant français serviable et professionnel. Tu dois fournir des réponses détaillées et pertinentes, adaptées au contexte de la conversation."  // Message système pour guider le comportement
            })
        });

        const data = await response.json();
        console.log('Réponse de Claude:', data); // Pour le débogage
        
        if (!response.ok) {
            console.error('Erreur API Claude:', data);
            return res.status(response.status).json(data);
        }

        // Envoyer la réponse complète au client
        res.json(data);

    } catch (error) {
        console.error('Erreur serveur:', error);
        res.status(500).json({
            error: {
                message: 'Erreur serveur interne',
                details: error.message
            }
        });
    }
});

// Les autres routes restent inchangées...

app.listen(port, () => {
    console.log(`
=========================================
🚀 Serveur démarré
-----------------------------------------
📋 Détails:
- Port: ${port}
- Clé API: ${process.env.CLAUDE_API_KEY ? '✅ Configurée' : '❌ Manquante'}
- Mode: ${process.env.NODE_ENV || 'development'}
-----------------------------------------
📍 Test: http://localhost:${port}/test
=========================================
    `);
});