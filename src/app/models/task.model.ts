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
  colorCode: string;
  completed: boolean;
  users: string [];
}

export class TaskItem implements Task {
  constructor(
    public id: string,
    public projectId: string,
    public createdAt: any,
    public updatedAt: any,
    public createdBy: string,
    public updatedBy: string,
    public title: string,
    public description: string,
    public index: number,
    public colorCode: string = null,
    public completed: boolean = false,
    public users: string[] = [],
    ) {}

  toObject(): Task {
    return {
      id: this.id,
      projectId: this.projectId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy,
      title: this.title,
      description: this.description,
      index: this.index,
      colorCode: this.colorCode,
      completed: this.completed,
      users: this.users
    };
  }
}
