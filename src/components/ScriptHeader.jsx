// src/components/ScriptHeader.jsx
import React from 'react';
import { Download, Upload } from 'lucide-react';
import { saveSystem } from '../utils/saveSystem';

function ScriptHeader({ currentScript, scriptId }) {
  const handleExport = () => {
    saveSystem.exportSaves();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      saveSystem.importSaves(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg mb-6">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-purple-900">Script {scriptId}</h1>
            <p className="text-purple-600 text-sm mt-1">
              Étape {currentScript.id}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleExport}
              className="flex items-center px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 border border-purple-200"
            >
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </button>
            <label className="flex items-center px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 border border-purple-200 cursor-pointer">
              <Upload className="w-4 h-4 mr-2" />
              Importer
              <input
                type="file"
                onChange={handleImport}
                accept=".json"
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div>
          <h2 className="text-xl font-bold text-purple-900 mb-2">{currentScript.title}</h2>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-gray-700">{currentScript.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScriptHeader;