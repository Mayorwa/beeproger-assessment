import axios from 'axios';
import {CreateTaskFormInterface, TaskInterface} from "../interfaces/TaskInterface";

export const http = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
});

export const cloudinary = axios.create({
    baseURL: process.env.REACT_APP_CLOUDINARY_URL
});

export class API {
    static createTaskResponse = (payload: CreateTaskFormInterface) => http.post(`items/create`, payload);
    static updateTaskResponse = (payload: CreateTaskFormInterface, taskId: string) => http.put(`items/${taskId}`, payload);
    static getAllTasksResponse = () => http.get(`items/get-all`);
    static markTaskAsCompleted = (payload: {item_id : string}) => http.put(`items/mark-as-complete`, payload);
    static deleteTaskResponse = (taskId : string) => http.delete(`items/${taskId}`);
    static getTaskDetailsResponse = (taskId: string) => http.get(`items/${taskId}`);
    static uploadFileToCloudinary = (payload: FormData) => cloudinary.post(`/image/upload`, payload);
}
