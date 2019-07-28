export interface UserMeta {
  [key: string]: UserMetaElement; // useRId
}

interface UserMetaElement {
  commentsLastRead?: any;
}
