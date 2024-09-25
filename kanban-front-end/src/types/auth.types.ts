import { ITaskResponse } from "./task.types";

export interface IAuthForm {
  email: string;
  password: string;
}

export interface ISingUpForm {
  name: string;
  email: string;
  password: string;
  department: string;
}

export interface IUser {
  [x: string]: any;
  map(
    arg0: (task: any) => import("react").JSX.Element
  ): import("react").ReactNode;
  id: string;
  name: string;
  email: string;
  role: string;
  tasks: ITaskResponse[];
  department: string;
  rating: number

}

export interface IAuthResponse {
  accessToken: string;
  user: IUser;
}



export type TypeUserForm = Omit<IUser, "id"> & { password?: string };
