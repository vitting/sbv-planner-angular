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
