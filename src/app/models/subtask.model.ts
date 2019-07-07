export interface SubTask {
  id: string;
  projectId: string;
  taskId: string;
  createdAt: any;
  updatedAt: any;
  createdBy: string;
  updatedBy: string;
  title: string;
  colorCode: string;
  completed: boolean;
  users: string[];
  index: number;
}

export class SubTaskItem implements SubTask {
  constructor(
    public id: string,
    public projectId: string,
    public taskId: string,
    public createdAt: any,
    public updatedAt: any,
    public createdBy: string,
    public updatedBy: string,
    public title: string,
    public colorCode: string = null,
    public completed: boolean = false,
    public users: string[] = [],
    public index: number  = 0
  ) {}

  static fromObject(subTask: SubTask) {
    return new SubTaskItem(
      subTask.id,
      subTask.projectId,
      subTask.taskId,
      subTask.createdAt,
      subTask.updatedAt,
      subTask.createdBy,
      subTask.updatedBy,
      subTask.title,
      subTask.colorCode,
      subTask.completed,
      subTask.users,
      subTask.index);
  }

  toObject(): SubTask {
    return {
      id: this.id,
      projectId: this.projectId,
      taskId: this.taskId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy,
      title: this.title,
      colorCode: this.colorCode,
      completed: this.completed,
      users: this.users,
      index: this.index
    };
  }
}
