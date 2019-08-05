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
