// src/components/ui/Card.jsx
import React from 'react';

export const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-lg ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children }) => (
  <div className="p-6 border-b border-gray-200">
    {children}
  </div>
);

export const CardTitle = ({ children }) => (
  <div>
    {children}
  </div>
);

export const CardContent = ({ children }) => (
  <div className="p-6">
    {children}
  </div>
);

export const Alert = ({ children, className = "" }) => (
  <div className={`rounded-lg p-4 ${className}`}>
    {children}
  </div>
);

export const AlertTitle = ({ children }) => (
  <h4 className="font-semibold mb-2">{children}</h4>
);

export const AlertDescription = ({ children }) => (
  <p>{children}</p>
);