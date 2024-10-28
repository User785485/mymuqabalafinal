import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { scripts } from '../data/scripts';
import AIAssistant from './AIAssistant';

function ScriptContent({ scriptId }) {
  const [currentStep, setCurrentStep] = useState('1');
  const [selectedOption, setSelectedOption] = useState(null);
  const [history, setHistory] = useState([]);

  const currentScript = scripts[scriptId]?.[currentStep];
  const totalSteps = Object.keys(scripts[scriptId] || {}).filter(key => key !== 'fin').length;

  const handleNext = (option) => {
    if (option?.next) {
      setHistory(prev => [...prev, {
        step: currentStep,
        response: option.label,
        text: currentScript.text
      }]);
      setCurrentStep(option.next);
      setSelectedOption(null);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prevHistory = [...history];
      const lastStep = prevHistory.pop();
      setHistory(prevHistory);
      setCurrentStep(lastStep.step);
      setSelectedOption(null);
      window.scrollTo(0, 0);
    }
  };

  if (!currentScript) return <div>Chargement...</div>;

  return (
    <div className="relative min-h-screen pb-20">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-purple-900">{currentScript.title}</h2>
          <p className="text-purple-600 mt-2">Étape {currentStep} sur {totalSteps}</p>
        </div>

        <div className="bg-purple-50 rounded-lg p-4 mb-6">
          <p className="text-gray-800 whitespace-pre-line">{currentScript.text}</p>
        </div>

        <div className="space-y-4">
          {currentScript.options?.map((option) => (
            <div key={option.id} className="relative">
              <button
                onClick={() => setSelectedOption(option)}
                className={`w-full text-left p-4 rounded-lg border transition-all
                  ${selectedOption?.id === option.id
                    ? 'bg-purple-100 border-purple-500 shadow-sm'
                    : 'border-gray-200 hover:bg-purple-50'}`}
              >
                <p className="font-medium text-gray-800">{option.label}</p>
                {selectedOption?.id === option.id && (
                  <div className="mt-3 pt-3 border-t border-purple-200">
                    <p className="text-purple-600 mb-4">{option.response}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext(option);
                      }}
                      className="flex items-center px-4 py-2 text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors ml-auto"
                    >
                      Étape suivante
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-72 right-0 bg-white border-t border-purple-100 p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <button
            onClick={handleBack}
            disabled={currentStep === '1'}
            className={`flex items-center px-4 py-2 rounded-lg 
              ${currentStep === '1' ? 'text-gray-400 cursor-not-allowed' : 'text-purple-600 hover:bg-purple-50'}`}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Précédent
          </button>

          <span className="text-gray-600">
            Étape {currentStep} sur {totalSteps}
          </span>
        </div>
      </div>

      <AIAssistant
        currentStep={currentStep}
        selectedOption={selectedOption}
        scriptData={currentScript}
      />
    </div>
  );
}

export default ScriptContent;