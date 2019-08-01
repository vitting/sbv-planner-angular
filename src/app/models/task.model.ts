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
  users: string[];
  colorCode: string;
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
    public completed: boolean = false,
    public users: string[] = [],
    public colorCode: string = null
    ) {}

    static fromObject(item: Task) {
      return new TaskItem(
        item.id,
        item.projectId,
        item.createdAt,
        item.updatedAt,
        item.createdBy,
        item.updatedAt,
        item.title,
        item.description,
        item.index,
        item.completed,
        item.users,
        item.colorCode
        );
    }

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
      completed: this.completed,
      users: this.users,
      colorCode: this.colorCode
    };
  }
}
