export interface Project {
    id: string;
    title: string;
    description: string;
    createdAt: any;
    updatedAt: any;
    createdBy: string;
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
    public createdBy: string,
    public users: string[] = [],
    public active: boolean = true,
    ) {}

    toObject(): Project {
      return {
        id: this.id,
        title: this.title,
        description: this.description,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        createdBy: this.createdBy,
        active: this.active,
        users: this.users
      };
    }
}
