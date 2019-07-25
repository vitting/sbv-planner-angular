export interface Template {
  id: string;
  title: string;
  description: string;
  createdAt: any;
  updatedAt: any;
  createdBy: string;
  updatedBy: string;
  colorCode: string;
  active: boolean;
}

export interface TemplateTask {
  id: string;
  title: string;
  description: string;
  templateId: string;
  active: boolean;
}

export interface TemplateSubTask {
  id: string;
  title: string;
  templateId: string;
  templateTaskId: string;
  active: boolean;
}

export class TemplateItem implements Template {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public createdAt: any,
    public updatedAt: any,
    public createdBy: string,
    public updatedBy: string,
    public colorCode: string = null,
    public active: boolean = true) { }

  toObject(): Template {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy,
      colorCode: this.colorCode,
      active: this.active
    };
  }
}
