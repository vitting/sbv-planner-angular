export interface Task {
  id: string;
  projectId: string;
  createdAt: any;
  updatedAt: any;
  title: string;
  description: string;
  colorCode: string;
  completed: boolean;
  users: string [];
  index: number;
}

export class TaskItem implements Task {
  constructor(
    public id: string,
    public projectId: string,
    public createdAt: any,
    public updatedAt: any,
    public title: string,
    public description: string,
    public colorCode: string,
    public completed: boolean,
    public users: string[],
    public index: number
    ) {}

  toObject(): Task {
    return {
      id: this.id,
      projectId: this.projectId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      title: this.title,
      description: this.description,
      colorCode: this.colorCode,
      completed: this.completed,
      users: this.users,
      index: this.index
    };
  }
}
