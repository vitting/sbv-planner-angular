export interface Project {
    id: string;
    title: string;
    description: string;
    createdAt: any;
    updatedAt: any;
    colorCode: string;
    active: boolean;
    users: string[];
}

export class ProjectItem implements Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public createdAt: any,
    public updatedAt: any,
    public colorCode: string,
    public active: boolean,
    public users: string[]
    ) {}

    toObject(): Project {
      return {
        id: this.id,
        title: this.title,
        description: this.description,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        colorCode: this.colorCode,
        active: this.active,
        users: this.users
      };
    }
}
