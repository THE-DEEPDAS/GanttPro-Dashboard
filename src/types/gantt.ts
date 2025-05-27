// GanttPro API types
export interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Task {
  id: string;
  projectId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  progress: number;  // 0-100
  type: 'task' | 'milestone' | 'project';
  dependencies: string[];
  assignee?: string;
  priority?: 'low' | 'medium' | 'high';
  status?: string;
}

// Gantt chart library types
export interface GanttTask {
  id: string;
  name: string;
  start: Date;
  end: Date;
  progress: number;
  type: 'task' | 'milestone' | 'project';
  dependencies: string[];
  styles?: {
    backgroundColor?: string;
    backgroundSelectedColor?: string;
    progressColor?: string;
    progressSelectedColor?: string;
  };
  isDisabled?: boolean;
  project?: string;
  hideChildren?: boolean;
}