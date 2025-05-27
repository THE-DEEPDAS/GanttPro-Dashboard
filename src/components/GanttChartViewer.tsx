import React, { useState } from 'react';
import { Gantt, ViewMode, Task } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import { useGanttProject } from '../context/GanttProjectContext';
import { convertToGanttTasks } from '../utils/ganttUtils';
import ProjectSelector from './ProjectSelector';
import DownloadOptions from './DownloadOptions';
import { RefreshCw, AlertCircle, Calendar, Users, Clock } from 'lucide-react';

const GanttChartViewer: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Month);
  const { 
    projects, 
    selectedProject, 
    tasks, 
    isLoading, 
    error, 
    selectProject,
    refreshData
  } = useGanttProject();

  const ganttTasks = convertToGanttTasks(tasks);
  
  const handleTaskClick = (task: Task) => {
    console.log('Task clicked:', task);
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-700"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span className="font-medium">Error loading data!</span>
        </div>
        <span className="block sm:inline mt-1">{error.message}</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-900 to-teal-800 px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <ProjectSelector 
              projects={projects} 
              selectedProject={selectedProject} 
              onSelectProject={selectProject} 
            />
            <button 
              onClick={refreshData}
              className="inline-flex items-center text-white hover:text-teal-200 transition-colors"
              title="Refresh data"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
            <div className="flex rounded-md overflow-hidden bg-white/10">
              <button 
                onClick={() => setViewMode(ViewMode.Day)} 
                className={`px-4 py-2 text-sm font-medium ${
                  viewMode === ViewMode.Day 
                    ? 'bg-teal-600 text-white' 
                    : 'text-white/80 hover:bg-white/20'
                }`}
              >
                <Calendar className="h-4 w-4 inline-block mr-1" />
                Day
              </button>
              <button 
                onClick={() => setViewMode(ViewMode.Week)} 
                className={`px-4 py-2 text-sm font-medium border-l border-white/20 ${
                  viewMode === ViewMode.Week 
                    ? 'bg-teal-600 text-white' 
                    : 'text-white/80 hover:bg-white/20'
                }`}
              >
                <Clock className="h-4 w-4 inline-block mr-1" />
                Week
              </button>
              <button 
                onClick={() => setViewMode(ViewMode.Month)} 
                className={`px-4 py-2 text-sm font-medium border-l border-white/20 ${
                  viewMode === ViewMode.Month 
                    ? 'bg-teal-600 text-white' 
                    : 'text-white/80 hover:bg-white/20'
                }`}
              >
                <Users className="h-4 w-4 inline-block mr-1" />
                Month
              </button>
            </div>
            
            <DownloadOptions chartId="gantt-container" projectName={selectedProject?.name || 'Project'} />
          </div>
        </div>
      </div>
      
      <div className="p-6 overflow-auto" id="gantt-container">
        {ganttTasks.length > 0 ? (
          <Gantt 
            tasks={ganttTasks}
            viewMode={viewMode}
            listCellWidth="320px"
            columnWidth={viewMode === ViewMode.Day ? 60 : viewMode === ViewMode.Week ? 250 : 300}
            onDateChange={() => {}} // Read-only
            onProgressChange={() => {}} // Read-only
            onDoubleClick={() => {}} // No action
            onClick={handleTaskClick}
            todayColor="rgba(252, 211, 77, 0.3)" // Amber highlight for today
            viewDate={new Date()} // Start view from today
            rtl={false}
            locale="en-GB"
            barFill={75} // Task bar height
            barCornerRadius={4} // Rounded corners
            rowHeight={50} // Increased row height
            headerHeight={50} // Increased header height
            ganttHeight={400} // Fixed height
          />
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500">
            {selectedProject ? 'No tasks found for this project' : 'Please select a project to view tasks'}
          </div>
        )}
      </div>
    </div>
  );
};

export default GanttChartViewer;