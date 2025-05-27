import React, { useState } from 'react';
import { Key, AlertCircle } from 'lucide-react';

interface ApiTokenFormProps {
  onSubmit: (token: string) => void;
}

const ApiTokenForm: React.FC<ApiTokenFormProps> = ({ onSubmit }) => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token.trim()) {
      setError('Please enter a valid API token');
      return;
    }
    
    // Basic validation - real validation would depend on the API token format
    if (token.length < 10) {
      setError('API token appears to be too short');
      return;
    }
    
    onSubmit(token);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-12 transition-all duration-300 hover:shadow-lg">
      <div className="bg-gradient-to-r from-blue-900 to-teal-800 px-6 py-4">
        <div className="flex items-center justify-center">
          <Key className="h-6 w-6 text-amber-400 mr-2" />
          <h2 className="text-xl font-semibold text-white">GanttPro API Access</h2>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="px-6 py-6">
        <div className="mb-6">
          <p className="text-gray-600 text-sm mb-4">
            Enter your GanttPro API token to access your projects and visualize them.
          </p>
          
          <label htmlFor="apiToken" className="block text-sm font-medium text-gray-700 mb-1">
            API Token
          </label>
          <input
            id="apiToken"
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            placeholder="Enter your GanttPro API token"
          />
          
          {error && (
            <div className="mt-2 text-red-500 text-sm flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {error}
            </div>
          )}
          
          <div className="mt-2 text-xs text-gray-500">
            You can find your API token in your GanttPro account settings.
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200"
          >
            Connect to GanttPro
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApiTokenForm;