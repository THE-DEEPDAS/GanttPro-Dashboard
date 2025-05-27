import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import GanttChartPage from './pages/GanttChartPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <GanttChartPage />
      </div>
    </QueryClientProvider>
  );
}

export default App;