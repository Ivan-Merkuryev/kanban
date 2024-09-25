import { axiosWithAuth, axiosClassic } from "@/api/interceptors";
import { IUser, TypeUserForm } from "@/types/auth.types";
import { ITaskResponse, TypeTaskFormState, ITaskReport, IGradeReport, ITasks } from "@/types/task.types";

export interface IProfileResponse {
  user: IUser;
}

class TaskService {
  private BASE_URL = "/task";

  async getTasks() {
    const response = await axiosWithAuth.get<ITaskResponse[]>(this.BASE_URL);
    return response;
  }

  async getOne(id: string) {
    const response = await axiosWithAuth.get<ITaskResponse>(`task/one/${id}`)
    return response
  }

  async getTasksForMe() {
    const response = await axiosWithAuth.get<ITasks>("task/me");
    return response;
  }



  async createTask(data: TypeTaskFormState) {
    const response = await axiosWithAuth.post(this.BASE_URL, data);
    return response;
  }

  async updateTask(id: string, data: TypeTaskFormState) {
    const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data);
    return response;
  }

  async deleteTask(id: string) {
    const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`);
    return response;
  }

  async writeAReport(id: string, data: ITaskReport) {
    const response = await axiosWithAuth.post(`${this.BASE_URL}/report/${id}`, data)
    return response
  }

  async getTaskReport(id: string) {
    const response = await axiosWithAuth.get(`${this.BASE_URL}/report/${id}`)
    return response
  }
  async writeGradeReport(id: string, data: IGradeReport) {
    const response = await axiosWithAuth.post(`${this.BASE_URL}/grade-report/${id}`, data)
    return response
  }
  

  // async writeAReport(data: data, id: string) {

  // }
  async reserveATask(id: string) {
    const response = await axiosWithAuth.post(`${this.BASE_URL}/reserve/${id}`)
    return response
  }
}

export const taskService = new TaskService();