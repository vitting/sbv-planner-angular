export interface User {
  id: string;
  name: string;
  createdAt: any;
  accepted: boolean;
  waitingForApproval: boolean;
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
    public accepted: boolean = false,
    public waitingForApproval: boolean = true,
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
      accepted: this.accepted,
      waitingForApproval: this.waitingForApproval,
      active: this.active,
      photoUrl: this.photoUrl
    };
  }
}
