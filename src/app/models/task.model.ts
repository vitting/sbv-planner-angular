export interface Task {
  id: string;
  projectId: string;
  createdAt: any;
  updatedAt: any;
  createdBy: string;
  updatedBy: string;
  title: string;
  description: string;
  index: number;
  completed: boolean;
}
