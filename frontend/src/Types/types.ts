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

export interface IUserConnectionData {
  _id: string;
  firstName: string;
  lastName: string;
  gender: string;
  age: string;
  photoUrl: string;
  skills: string[];
  about: string;
}

export interface IFeedState {
  userReviewConnections: IUserConnectionData[] | null;
  userAllRequestLoading: boolean;
  fetchReviewConnectionsSuccessfull: boolean;
  fetchReviewConnectionsFailure: boolean;
  error: IError | null;
  //following data is for reviewing/rejecting the connection request
  acceptOrRejectionMessage: string | null;
  reviewingTheRequest: boolean;
  errorInReviewingRequest: IError | null;
  allConnectionRequest: boolean;
  wantToConnectUsers: ILovers[] | null;
  connectionsLoading: boolean;
  errorInGettingConnection: IError | null;
}
export interface IUserFeedResponse {
  data: {
    message: string;
    user: IUserConnectionData[];
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

export interface ILovers {
  _id: string;
  fromRequest: {
    _id: string;
    firstName: string;
    lastName: string;
    age: string;
    gender: string;
    photoUrl: string;
    about: string;
    skills: string[];
    toRequest: string;
    status: string;
  };
}

export interface IGetConnectionResponse {
  data: {
    message: string;
    user: ILovers[];
  };
}

export interface IShowAllFriends {
  data: {
    message: string;
    user: IProfileData[];
  };
}
export interface IFriendsState {
  getFriendsSuccessful: boolean;
  getFriendsFailure: boolean;
  error: IError | null;
  friends: IProfileData[] | null;
  loading: boolean;
}
