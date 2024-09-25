export interface ITaskResponse {
  id: string;
  createdAt: string;
  // updatedAt?: string
  author: {
    id: string;
    name: string;
  };
  title: string;
  description: string;
  department: [string];
  deadline: Date;
  reserve: boolean;
  whoReserved: string;
  newTask?: boolean;
  done: boolean;
  whoDone: string;
}

export interface ITasks {
  newTasks: ITaskResponse[];
  oldTasks: ITaskResponse[];
  youReservedTasks: ITaskResponse[];
  youCompletedTasks: ITaskResponse[];
}

export interface IReport {
  name: string;
  text: string;
  taskId: string;
  grade?: number;
  rating?: number;
}

export interface IGradeReport {
  grade: number;
}

export type TypeTaskFormState = Partial<
  Omit<ITaskResponse, "id" | "updatedAt">
>;

export interface ITaskReport {
  text: string;
}
