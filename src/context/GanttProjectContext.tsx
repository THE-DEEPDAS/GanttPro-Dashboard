import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { fetchProjects, fetchProjectTasks } from '../services/ganttProApi';
import { Project, Task } from '../types/gantt';

interface GanttProjectContextType {
  projects: Project[];
  selectedProject: Project | null;
  tasks: Task[];
  isLoading: boolean;
  error: Error | null;
  selectProject: (projectId: string) => void;
  refreshData: () => void;
}

const GanttProjectContext = createContext<GanttProjectContextType | undefined>(undefined);

export const useGanttProject = () => {
  const context = useContext(GanttProjectContext);
  if (!context) {
    throw new Error('useGanttProject must be used within a GanttProjectProvider');
  }
  return context;
};

interface GanttProjectProviderProps {
  children: React.ReactNode;
  apiToken: string;
}

export const GanttProjectProvider: React.FC<GanttProjectProviderProps> = ({ children, apiToken }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { 
    data: projects = [], 
    isLoading: isProjectsLoading, 
    error: projectsError,
    refetch: refetchProjects 
  } = useQuery<Project[], Error>('projects', () => fetchProjects(apiToken), {
    enabled: !!apiToken,
    onSuccess: (data) => {
      if (data.length > 0 && !selectedProject) {
        setSelectedProject(data[0]);
      }
    }
  });

  const { 
    data: tasks = [], 
    isLoading: isTasksLoading, 
    error: tasksError,
    refetch: refetchTasks
  } = useQuery<Task[], Error>(
    ['tasks', selectedProject?.id], 
    () => selectedProject ? fetchProjectTasks(apiToken, selectedProject.id) : Promise.resolve([]),
    { 
      enabled: !!selectedProject,
    }
  );

  const selectProject = (projectId: string) => {
    const project = projects.find(p => p.id === projectId) || null;
    setSelectedProject(project);
  };

  const refreshData = () => {
    refetchProjects();
    if (selectedProject) {
      refetchTasks();
    }
  };

  const value = {
    projects,
    selectedProject,
    tasks,
    isLoading: isProjectsLoading || isTasksLoading,
    error: projectsError || tasksError,
    selectProject,
    refreshData
  };

  return (
    <GanttProjectContext.Provider value={value}>
      {children}
    </GanttProjectContext.Provider>
  );
};