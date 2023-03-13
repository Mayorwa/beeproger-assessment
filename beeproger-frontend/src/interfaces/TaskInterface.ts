export interface TaskInterface {
    id: string;
    title: string;
    description: string;
    status: string;
    created_at: string;
    image?: string;
}

export interface CreateTaskFormInterface{
    title: string,
    description: string,
    image?: any
}