// src/components/layout/MainLayout.jsx
import React from 'react';
import ScriptSidebar from '../ScriptSidebar';
import ScriptContent from '../ScriptContent';

function MainLayout() {
  const [currentScript, setCurrentScript] = React.useState('script1');  // Changé ici

  const handleScriptChange = (scriptId) => {
    setCurrentScript(scriptId);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-purple-100 to-white">
      <ScriptSidebar 
        currentScript={currentScript}
        onScriptChange={handleScriptChange}
      />
      <div className="ml-72 flex-1 p-6">
        <ScriptContent scriptId={currentScript} />
      </div>
    </div>
  );
}

export default MainLayout;