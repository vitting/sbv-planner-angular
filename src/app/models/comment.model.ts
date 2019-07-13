export interface Comment {
  id: string;
  parentId: string; // ProjectId or SubtaskId or TaskId
  text: string;
  createdAt: any;
  updatedAt: any;
  type: string;
  userId: string;
  active: boolean;
}

export class CommentItem implements Comment {
  constructor(
    public id: string,
    public parentId: string,
    public text: string,
    public createdAt: any,
    public updatedAt: any,
    public type: string,
    public userId: string,
    public active: boolean = true,
  ) { }

  toObject(): Comment {
    return {
      id: this.id,
      parentId: this.parentId,
      text: this.text,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      type: this.type,
      userId: this.userId,
      active: this.active
    };
  }
}
