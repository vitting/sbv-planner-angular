export interface Template {
  id: string;
  title: string;
  description: string;
  createdAt: any;
  updatedAt: any;
  createdBy: string;
  updatedBy: string;
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
