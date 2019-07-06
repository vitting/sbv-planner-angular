export interface Project {
    id: string;
    title: string;
    description: string;
    createdAt: any;
    updatedAt: any;
    createdBy: string;
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
    public createdBy: string,
    public colorCode: string = null,
    public active: boolean = true,
    public users: string[] = []
    ) {}

    toObject(): Project {
      return {
        id: this.id,
        title: this.title,
        description: this.description,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        createdBy: this.createdBy,
        colorCode: this.colorCode,
        active: this.active,
        users: this.users
      };
    }
}
