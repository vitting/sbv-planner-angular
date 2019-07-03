import { CommentUser } from './comment-user.model';

export interface Comment {
  id: string;
  parentId: string; // SubtaskId or TaskId
  text: string;
  createdAt: any;
  active: boolean;
  user: CommentUser;
}

export class CommentItem implements Comment {
  constructor(
    public id: string,
    public parentId: string,
    public text: string,
    public createdAt: any,
    public active: boolean,
    public user: CommentUser
  ) { }

  toObject(): Comment {
    return {
      id: this.id,
      parentId: this.parentId,
      text: this.text,
      createdAt: this.createdAt,
      active: this.active,
      user: this.user
    };
  }
}
