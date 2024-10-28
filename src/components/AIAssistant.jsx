import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Maximize2, Minimize2 } from 'lucide-react';
import { callClaudeAPI } from '../api/claude';

function AIAssistant() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Fonction pour scroller automatiquement en bas de la fenêtre de chat
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMessage = inputValue.trim();
        setInputValue('');

        const newMessage = {
            role: 'user',
            content: userMessage
        };

        // Ajoute le message de l'utilisateur à la liste des messages
        setMessages(prev => [...prev, newMessage]);

        setIsLoading(true);

        try {
            const systemPrompt = `Tu es une assistante IA. Réponds de manière professionnelle et concise.`;
            const response = await callClaudeAPI([...messages, newMessage], systemPrompt);

            if (response && response.content && response.content.length > 0) {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: response.content[0].text
                }]);
            } else {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: "Je n'ai pas pu comprendre votre demande. Pouvez-vous reformuler ?"
                }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "Désolé, je rencontre des difficultés techniques. Pouvez-vous reformuler votre question ?"
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-lg flex items-center gap-2"
                >
                    <MessageCircle className="w-6 h-6" />
                    <span>Assistant</span>
                </button>
            ) : (
                <div 
                    className={`bg-white rounded-lg shadow-xl flex flex-col ${
                        isExpanded ? 'w-[600px] h-[600px]' : 'w-[400px] h-[500px]'
                    }`}
                >
                    <div className="p-4 bg-purple-600 text-white rounded-t-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <MessageCircle className="w-5 h-5" />
                            <h3 className="font-semibold">Assistant IA</h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="hover:bg-purple-700 p-1 rounded"
                            >
                                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                            </button>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-purple-700 p-1 rounded"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message, index) => (
                            <div 
                                key={index}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`p-3 rounded-lg max-w-[80%] ${
                                    message.role === 'user' 
                                        ? 'bg-purple-100 text-purple-800' 
                                        : 'bg-gray-100 text-gray-800'
                                }`}>
                                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                        
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 p-3 rounded-lg">
                                    <div className="flex space-x-2">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="p-4 border-t">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Posez votre question..."
                                className="flex-1 px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus...:ring-purple-500"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !inputValue.trim()}
                                className={`p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center justify-center ${
                                    (isLoading || !inputValue.trim()) ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default AIAssistant;
