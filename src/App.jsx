import React, { useState } from 'react';
import { 
  ArrowRight, 
  RotateCcw, 
  CheckCircle, 
  Clock, 
  MessageCircle
} from 'lucide-react';

// Composants UI de base
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-lg ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="p-6 border-b border-gray-200">
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <div>
    {children}
  </div>
);

const CardContent = ({ children }) => (
  <div className="p-6">
    {children}
  </div>
);

const Alert = ({ children, className = "" }) => (
  <div className={`rounded-lg p-4 ${className}`}>
    {children}
  </div>
);

const AlertTitle = ({ children }) => (
  <h4 className="font-semibold mb-2">{children}</h4>
);

const AlertDescription = ({ children }) => (
  <p>{children}</p>
);

function App() {
  return (
    <div className="app">
      <MainLayout />
    </div>
  )
}

// Script Navigator Component maintenant dans un fichier séparé
import MainLayout from './components/layout/MainLayout';

export default App;