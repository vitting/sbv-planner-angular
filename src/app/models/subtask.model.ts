export interface SubTask {
  id: string;
  projectId: string;
  taskId: string;
  createdAt: any;
  title: string;
  colorCode: string;
  completed: boolean;
  users: string[];
}

export class SubTaskItem implements SubTask {
  constructor(
    public id: string,
    public projectId: string,
    public taskId: string,
    public createdAt: any,
    public title: string,
    public colorCode: string,
    public completed: boolean,
    public users: string[]
  ) {}

  toObject(): SubTask {
    return {
      id: this.id,
      projectId: this.projectId,
      taskId: this.taskId,
      createdAt: this.createdAt,
      title: this.title,
      colorCode: this.colorCode,
      completed: this.completed,
      users: this.users
    };
  }
}
