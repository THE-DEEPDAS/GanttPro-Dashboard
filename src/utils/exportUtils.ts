import { Task } from '../types/gantt';
import { format } from 'date-fns';

/**
 * Exports task data to a CSV file and triggers download
 */
export const exportToCsv = (tasks: Task[], filename: string): void => {
  if (!tasks.length) return;
  
  // Define CSV headers
  const headers = [
    'Task ID',
    'Task Name',
    'Start Date',
    'End Date',
    'Progress',
    'Type',
    'Dependencies',
    'Priority',
    'Status',
  ];
  
  // Format task data for CSV
  const rows = tasks.map(task => [
    task.id,
    `"${task.name.replace(/"/g, '""')}"`, // Escape quotes in names
    formatDateForCsv(task.startDate),
    formatDateForCsv(task.endDate),
    `${task.progress}%`,
    task.type,
    task.dependencies.join(', '),
    task.priority || '',
    task.status || '',
  ]);
  
  // Combine headers and rows
  const csv = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  // Create and trigger download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Formats a date for CSV export
 */
const formatDateForCsv = (date: Date): string => {
  return format(new Date(date), 'yyyy-MM-dd');
};