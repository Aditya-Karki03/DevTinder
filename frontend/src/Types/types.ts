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
      photoUrl: string;
      about: string;
      skills: string[];
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
  photoUrl: string;
  about: string;
  skills: string[];
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

export interface IUsersInFeed {
  _id: string;
  firstName: string;
  lastName: string;
  gender: string;
}

export interface IFeedState {
  userFeed: IUsersInFeed[] | null;
  userFeedLoading: boolean;
  userFeedSuccessfull: boolean;
  userFeedFailure: boolean;
  error: IError | null;
}
export interface IUserFeedResponse {
  data: {
    message: string;
    user: IUsersInFeed[];
  };
}


export interface ISignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  gender: string;
  about: string;
  skills: string[];
  photoUrl: string;
}
