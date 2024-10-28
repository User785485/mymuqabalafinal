// src/api/claude.js
// Remplacez tout le contenu par ceci :

export const callClaudeAPI = async (messages, systemPrompt) => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "claude-3-opus-20240229",
        max_tokens: 1024,
        system: systemPrompt,
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erreur API:', errorData);
      throw new Error(errorData.error?.message || 'Erreur API inconnue');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur lors de l\'appel à l\'API:', error);
    throw error;
  }
}

// server/server.js 
// Remplacez tout le contenu par ceci :

const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const fs = require('fs');

// Charger les variables d'environnement
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static('public'));

// Route de test
app.get('/test', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Route API Claude
app.post('/api/chat', async (req, res) => {
    console.log('Nouvelle requête chat reçue');
    
    if (!process.env.CLAUDE_API_KEY) {
        return res.status(500).json({ 
            error: { 
                message: 'Clé API non configurée' 
            } 
        });
    }

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.CLAUDE_API_KEY,
                'anthropic-version': '2024-02-29'
            },
            body: JSON.stringify({
                model: "claude-3-opus-20240229",
                max_tokens: 1024,
                ...req.body
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            console.error('Erreur API Claude:', data);
            return res.status(response.status).json(data);
        }

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

// Route par défaut pour React
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Démarrer le serveur
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