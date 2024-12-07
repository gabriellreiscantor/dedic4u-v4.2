import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  errors: string[];
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ errors }) => {
  if (errors.length === 0) return null;

  return (
    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
      <div className="flex items-start">
        <AlertCircle className="text-red-500 w-5 h-5 mt-0.5 mr-2 flex-shrink-0" />
        <div>
          {errors.map((error, index) => (
            <p key={index} className="text-red-500">{error}</p>
          ))}
        </div>
      </div>
    </div>
  );
};