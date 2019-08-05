export interface SubTask {
  id: string;
  projectId: string;
  taskId: string;
  createdAt: any;
  updatedAt: any;
  createdBy: string;
  updatedBy: string;
  title: string;
  completed: boolean;
  users: string[];
}
