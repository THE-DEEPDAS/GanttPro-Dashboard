import axios from 'axios';
import { Project, Task } from '../types/gantt';

const API_BASE_URL = 'https://api.ganttpro.com/v1.0';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // Remove withCredentials as it's not needed for API key auth
  timeout: 10000,
});

// Add response interceptor for better error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK' || (error.response && error.response.status === 403)) {
      console.error('Network Error or Access Denied');
      throw new Error(
        'Access denied. If you are running locally, please contact GanttPro support to add your IP address to the trusted list. ' +
        'Otherwise, please check your API key and ensure you are accessing from a valid domain.'
      );
    }
    throw error;
  }
);

export const setApiToken = (token: string) => {
  apiClient.defaults.headers.common['X-API-KEY'] = token;
};

// Fetch all projects
export const fetchProjects = async (token: string): Promise<Project[]> => {
  setApiToken(token);
  
  try {
    console.log('Making API request to:', `${API_BASE_URL}/projects/`);
    console.log('Headers:', {
      ...apiClient.defaults.headers.common,
      'X-API-KEY': token.substring(0, 5) + '...' // Only log part of the token for security
    });
    
    const response = await apiClient.get('/projects/');
    console.log('API Response:', response.status, response.statusText);
    console.log('Response headers:', response.headers);
    
    if (!response.data) {
      throw new Error('No data received from the API');
    }
    
    return response.data.data || [];
  } catch (error) {
    const axiosError = error as any;
    console.error('API Error Details:', {
      status: axiosError?.response?.status,
      statusText: axiosError?.response?.statusText,
      data: axiosError?.response?.data,
      headers: axiosError?.response?.headers
    });
    
    if (axios.isAxiosError(error)) {
      const status = axiosError?.response?.status;
      if (status === 401) {
        throw new Error('Invalid API key. Please check your credentials.');
      }
      if (status === 403) {
        throw new Error('Access forbidden. Please verify your API key permissions.');
      }
      const errorMessage = axiosError?.response?.data?.message || axiosError?.message || 'Failed to fetch projects';
      throw new Error(`API Error: ${errorMessage}`);
    }
    throw error;
  }
};

// Fetch tasks for a specific project
export const fetchProjectTasks = async (token: string, projectId: string): Promise<Task[]> => {
  setApiToken(token);
  
  try {
    console.log('Making API request to:', `${API_BASE_URL}/tasks/?projectId=${projectId}`);
    const response = await apiClient.get(`/tasks/`, {
      params: {
        projectId
      }
    });
    const tasks = response.data.data || [];
    
    // Transform the data to match our Task interface
    return tasks.map((task: any) => ({
      id: task.id,
      projectId: task.project_id,
      name: task.name,
      startDate: new Date(task.start_date),
      endDate: new Date(task.end_date),
      progress: task.progress || 0,
      type: task.type || 'task',
      dependencies: task.dependencies || [],
      assignee: task.assignee,
      priority: task.priority,
      status: task.status,
      description: task.description,
      color: task.color,
    }));
  } catch (error) {
    const axiosError = error as any;
    console.error('API Error Details:', {
      status: axiosError?.response?.status,
      statusText: axiosError?.response?.statusText,
      data: axiosError?.response?.data,
      headers: axiosError?.response?.headers
    });

    if (axios.isAxiosError(error)) {
      const status = axiosError?.response?.status;
      if (status === 404) {
        throw new Error('Project not found. Please check the project ID.');
      }
      const errorMessage = axiosError?.response?.data?.message || axiosError?.message || 'Failed to fetch tasks';
      throw new Error(`API Error: ${errorMessage}`);
    }
    throw error;
  }
};