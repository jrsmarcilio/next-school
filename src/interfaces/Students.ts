export interface IStudent {
  id?: number;
  name: string;
  email: string;
  course: number;
  register: string;
  gender: string;
}

export interface NewIStudent {
  id?: number;
  name: string;
  register: string;
  gender: string;
  email: string;
  course: number;
}

export interface IStudentDTO {
  id: number;
  name: string;
  register: string;
  gender: string;
  email: string;
  course: number;
}

export interface IUserLogin {
  username: string;
  password: string;
}

export interface ICourseData {
  id?: number;
  name: string;
}

export interface CourseData {
  id: number;
  name: string;
}
