import { format } from 'date-fns';
import { Task, GanttTask } from '../types/gantt';

export const convertToGanttTasks = (tasks: Task[]): GanttTask[] => {
  return tasks.map(task => {
    // Define color schemes based on priority and status
    const getTaskColor = () => {
      // Priority colors
      if (task.priority === 'high') return '#ef4444';
      if (task.priority === 'medium') return '#f59e0b';
      if (task.priority === 'low') return '#10b981';
      
      // Status colors
      if (task.status === 'completed') return '#059669';
      if (task.status === 'in_progress') return '#3b82f6';
      if (task.status === 'delayed') return '#dc2626';
      
      // Default color based on task type
      if (task.type === 'milestone') return '#8b5cf6';
      if (task.type === 'project') return '#0ea5e9';
      
      // Default task color
      return '#64748b';
    };

    const backgroundColor = task.color || getTaskColor();
    
    return {
      id: task.id,
      name: task.name,
      start: new Date(task.startDate),
      end: new Date(task.endDate),
      progress: task.progress / 100,
      type: task.type,
      dependencies: task.dependencies,
      isDisabled: true,
      project: task.projectId,
      styles: {
        backgroundColor,
        progressColor: task.type === 'milestone' ? backgroundColor : '#93c5fd',
        backgroundSelectedColor: darkenColor(backgroundColor, 15),
        progressSelectedColor: '#2563eb',
      },
      fontSize: '14px',
    };
  });
};

export const formatDate = (date: Date): string => {
  return format(date, 'MMM d, yyyy');
};

function darkenColor(color: string, amount: number): string {
  color = color.replace('#', '');
  
  let r = parseInt(color.substring(0, 2), 16);
  let g = parseInt(color.substring(2, 4), 16);
  let b = parseInt(color.substring(4, 6), 16);
  
  r = Math.max(0, r - amount);
  g = Math.max(0, g - amount);
  b = Math.max(0, b - amount);
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}