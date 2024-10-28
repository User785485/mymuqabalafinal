// src/components/ScriptSidebar.jsx
import React, { useState } from 'react';
import {
  BookOpen,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

const scriptsList = [
  { id: 'script1', title: 'Script 1' },
  { id: 'script2', title: 'Script 2' }
];

function ScriptSidebar({ currentScript, onScriptChange }) {
  const [showScripts, setShowScripts] = useState(true);

  return (
    <div className="w-72 bg-white border-r border-purple-100 h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-4 space-y-4">
        <div>
          <button
            className="w-full flex items-center justify-between p-2 bg-purple-50 rounded-lg mb-2"
            onClick={() => setShowScripts(!showScripts)}
          >
            <div className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-purple-700" />
              <span className="font-bold text-purple-900">Scripts</span>
            </div>
            <ChevronDown className={`w-4 h-4 transform transition-transform ${showScripts ? 'rotate-180' : ''}`} />
          </button>
          
          {showScripts && (
            <div className="space-y-2 ml-2">
              {scriptsList.map((script) => (
                <button
                  key={script.id}
                  onClick={() => onScriptChange(script.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center justify-between ${
                    currentScript === script.id
                      ? 'bg-purple-100 text-purple-700'
                      : 'hover:bg-purple-50 text-gray-700'
                  }`}
                >
                  <span>{script.title}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ScriptSidebar;