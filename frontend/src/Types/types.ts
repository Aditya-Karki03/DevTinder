export interface ILoginFormData {
  email: string;
  password: string;
}

export interface IUserLoginData {
  age: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
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

export interface IProfileResponseData {
  data: {
    message: string;
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      age: number;
      gender: string;
    };
  };
}

//interface for initial value of profile
export interface IProfileData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
}
export interface IError {
  error: string;
  errorCode: string;
}
export interface IProfileInitialState {
  profileFetchingSuccessfull: boolean;
  profileFetchingFailure: boolean;
  profileData: IProfileData | null;
  error: IError | null;
  loading: boolean;
}
