export interface IStudent {
  id?: number;
  name: string;
  email: string;
  course: string;
}

export interface IStudentDTO {
  id: number;
  name: string;
  email: string;
  course: string;
}

export interface IUserLogin {
  username: string;
  password: string;
}
