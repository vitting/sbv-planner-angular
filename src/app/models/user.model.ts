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
