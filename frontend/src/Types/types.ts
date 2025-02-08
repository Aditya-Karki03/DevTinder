export interface ILoginFormData {
  email: string;
  password: string;
}

interface IUserLoginData {
  age: number;
  email: string;
  firstName: string;
  lastName: string;
  _id: string;
}

export interface ILoginResponseData {
  data: {
    message: string;
    user: IUserLoginData;
  };
}
export interface ILogoutResponseData {
  message: string;
  user: null;
}
