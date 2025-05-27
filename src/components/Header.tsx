import React from 'react';
import { Calendar, Download, BarChart2 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-teal-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart2 className="h-6 w-6 text-amber-400" />
            <h1 className="text-2xl font-bold tracking-tight">GanttPro Viewer</h1>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4 text-sm">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Timeline Viewer</span>
            </div>
            <div className="flex items-center space-x-1">
              <Download className="h-4 w-4" />
              <span>Export & Download</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;