import { axiosClassic, axiosWithAuth } from "@/api/interceptors";
import { IUser, TypeUserForm } from "@/types/auth.types";

export interface IProfileResponse {
  user: IUser;
}

class UserService {
  private BASE_URL = "/user";

  async getProfile() {
    const response = await axiosWithAuth.get<IUser>(this.BASE_URL);
    return response;
  }

  async update(data: TypeUserForm) {
    const response = await axiosWithAuth.put(this.BASE_URL, data);
    return response.data;
  }
}

export const userService = new UserService();
