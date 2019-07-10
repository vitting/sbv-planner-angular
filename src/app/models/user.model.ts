export interface User {
  id: string;
  name: string;
  createdAt: any;
  approved: boolean;
  admin: boolean;
  editor: boolean;
  active: boolean;
  photoUrl: string;
}

export class UserItem implements User {
  constructor(
    public id: string,
    public name: string,
    public createdAt: any,
    public approved: boolean = true,
    public admin: boolean = false,
    public editor: boolean = true,
    public active: boolean = true,
    public photoUrl: string = null
  ) {}

  toObject(): User {
    return {
      id: this.id,
      admin: this.admin,
      editor: this.editor,
      name: this.name,
      createdAt: this.createdAt,
      approved: this.approved,
      active: this.active,
      photoUrl: this.photoUrl
    };
  }
}
