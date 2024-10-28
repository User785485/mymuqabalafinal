const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

async function testClaudeAPI() {
    console.log('Test de l\'API Claude');
    console.log('Clé API présente :', process.env.CLAUDE_API_KEY ? 'Oui' : 'Non');
    
    const requestBody = {
        model: "claude-3-5-sonnet-20241022",  // Modèle mis à jour
        messages: [
            {
                role: "user",
                content: "Dis bonjour"
            }
        ],
        max_tokens: 1024
    };

    try {
        console.log('Envoi de la requête à l\'API...');
        
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.CLAUDE_API_KEY,
                'anthropic-version': '2023-06-01'  // Version stable de l'API
            },
            body: JSON.stringify(requestBody)
        });

        console.log('Status de la réponse:', response.status);
        
        const data = await response.json();
        
        if (!response.ok) {
            console.error('Erreur API :', data);
            console.error('Status:', response.status);
            return;
        }

        console.log('Réponse réussie :', JSON.stringify(data, null, 2));

    } catch (error) {
        console.error('Erreur de requête :', error.message);
    }
}

testClaudeAPI();