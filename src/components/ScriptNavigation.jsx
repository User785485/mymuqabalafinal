// src/components/ScriptNavigation.jsx
import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

function ScriptNavigation({ currentStep, totalSteps, onBack, onForward }) {
  return (
    <div className="fixed bottom-0 left-72 right-0 bg-white border-t border-purple-100 p-4">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        <button
          onClick={onBack}
          disabled={currentStep === 1}
          className={`flex items-center px-4 py-2 rounded-lg ${
            currentStep === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-purple-600 hover:bg-purple-50'
          }`}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Précédent
        </button>
        <span className="text-gray-600">
          Étape {currentStep} sur {totalSteps}
        </span>
        <button
          onClick={onForward}
          disabled={!onForward}
          className={`flex items-center px-4 py-2 rounded-lg ${
            !onForward
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-purple-600 hover:bg-purple-50'
          }`}
        >
          Suivant
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
}

export default ScriptNavigation;