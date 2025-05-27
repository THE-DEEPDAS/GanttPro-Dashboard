import React, { useState } from 'react';
import Header from '../components/Header';
import GanttChartViewer from '../components/GanttChartViewer';
import ApiTokenForm from '../components/ApiTokenForm';
import { GanttProjectProvider } from '../context/GanttProjectContext';

const GanttChartPage: React.FC = () => {
  const [apiToken, setApiToken] = useState<string>('');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        {!apiToken ? (
          <ApiTokenForm onSubmit={setApiToken} />
        ) : (
          <GanttProjectProvider apiToken={apiToken}>
            <GanttChartViewer />
          </GanttProjectProvider>
        )}
      </main>
      <footer className="bg-gray-800 text-white py-4 text-center text-sm">
        <p>GanttPro Chart Viewer &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default GanttChartPage;