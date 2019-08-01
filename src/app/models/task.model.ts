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
    public completed: boolean = false
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
      completed: this.completed
    };
  }
}
