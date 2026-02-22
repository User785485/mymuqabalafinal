// src/components/ScriptHistory.jsx
import React from 'react';
import { Clock, ArrowRight, MessageCircle } from 'lucide-react';

function ScriptHistory({ history }) {
  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-purple-900 mb-4 flex items-center">
        <MessageCircle className="w-5 h-5 mr-2" />
        Historique de la conversation
      </h2>
      <div className="space-y-4">
        {history.map((item, index) => (
          <div key={index} className="border-l-4 border-purple-300 pl-4 py-2">
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <Clock className="w-4 h-4 mr-1" />
              <span>Étape {item.step}</span>
            </div>
            <p className="text-gray-800">{item.text}</p>
            <div className="mt-2 flex items-center text-purple-600">
              <ArrowRight className="w-4 h-4 mr-1" />
              <span className="font-medium">{item.response}</span>
            </div>
            <p className="text-gray-500 text-sm mt-1 italic">{item.feedback}</p>
            {item.notes && (
              <div className="mt-2 bg-purple-50 p-2 rounded">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Notes:</span> {item.notes}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScriptHistory;