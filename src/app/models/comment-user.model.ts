export interface CommentUser {
  id: string;
  name: string;
}

export class CommentUserItem implements CommentUser {
  constructor(
    public id: string,
    public name: string
  ) {}

  toObject(): CommentUser {
    return {
      id: this.id,
      name: this.name
    };
  }
}
