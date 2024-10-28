// src/components/ScriptNotes.jsx
import React from 'react';

function ScriptNotes({ notes, setNotes, currentNotes }) {
  return (
    <div className="space-y-4">
      {currentNotes && (
        <div className="bg-yellow-50 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">Notes importantes:</h3>
          <ul className="list-disc list-inside space-y-1">
            {currentNotes.map((note, index) => (
              <li key={index} className="text-yellow-700 text-sm">{note}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes sur la réponse du client..."
          className="w-full h-24 p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
        />
      </div>
    </div>
  );
}

export default ScriptNotes;