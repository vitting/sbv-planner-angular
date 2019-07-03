export interface User {
  id: string;
  admin: boolean;
  editor: boolean;
  name: string;
  createdAt: any;
  active: boolean;
  photoUrl: string;
}

export class UserItem implements User {
  constructor(
    public id: string,
    public admin: boolean,
    public editor: boolean,
    public name: string,
    public createdAt: any,
    public active: boolean,
    public photoUrl: string
  ) {}

  toObject(): User {
    return {
      id: this.id,
      admin: this.admin,
      editor: this.editor,
      name: this.name,
      createdAt: this.createdAt,
      active: this.active,
      photoUrl: this.photoUrl
    };
  }
}
