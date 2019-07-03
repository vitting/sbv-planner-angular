export interface Task {
  id: string;
  projectId: string;
  createdAt: any;
  title: string;
  description: string;
  colorCode: string;
  completed: boolean;
  users: string [];
}

export class TaskItem implements Task {
  constructor(
    public id: string,
    public projectId: string,
    public createdAt: any,
    public title: string,
    public description: string,
    public colorCode: string,
    public completed: boolean,
    public users: string[]
    ) {}

  toObject(): Task {
    return {
      id: this.id,
      projectId: this.projectId,
      createdAt: this.createdAt,
      title: this.title,
      description: this.description,
      colorCode: this.colorCode,
      completed: this.completed,
      users: this.users
    };
  }
}
