import React from 'react';
import { Project } from '../types/gantt';
import { ChevronDown } from 'lucide-react';

interface ProjectSelectorProps {
  projects: Project[];
  selectedProject: Project | null;
  onSelectProject: (projectId: string) => void;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({ 
  projects, 
  selectedProject, 
  onSelectProject 
}) => {
  if (projects.length === 0) {
    return <div className="text-gray-500">No projects available</div>;
  }

  return (
    <div className="relative">
      <select
        value={selectedProject?.id || ''}
        onChange={(e) => onSelectProject(e.target.value)}
        className="appearance-none bg-white border border-gray-300 text-gray-900 text-sm rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
      >
        <option value="" disabled>Select a project</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <ChevronDown className="h-4 w-4" />
      </div>
    </div>
  );
};

export default ProjectSelector;