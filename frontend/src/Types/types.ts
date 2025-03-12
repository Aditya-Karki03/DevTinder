import { Dispatch, SetStateAction } from "react";

export interface ILoginFormData {
  email: string;
  otp: string;
}

export interface IUserLoginData {
  age: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  photoUrl: string;
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
  //types for edit profile
  editProfileSuccess: boolean;
  errorOnEdit: IError | null;
  editProfileFailure: boolean;
  editingInProgress: boolean;
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
  // allConnectionRequest: boolean;
  wantToConnectUsers: ILovers[] | null;
  connectionsLoading: boolean;
  errorInGettingConnection: IError | null;
  //following data is for reviewing/rejecting the connection request
  acceptOrRejectionMessage: string | null;
  reviewingTheRequest: boolean;
  errorInReviewingRequest: IError | null;
  acceptOrRejectionSuccessful: boolean;
  acceptOrRejectionFailure: boolean;
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

export interface IFeedInitialState {
  getFeedSuccessfull: boolean;
  getFeedFailure: boolean;
  error: IError | null;
  loading: boolean;
  feedData: IProfileData[] | null;
  //below is for send connection/rejecting the feed
  connectionRejectionSuccess: boolean;
  connectionRejectionFailure: boolean;
  connectionRejectionLoading: boolean;
  connectionRejectionError: IError | null;
  message: string | null;
}
export interface IFeedDataResponse {
  data: {
    message: string;
    user: IProfileData[];
  };
}

export interface IConnectionResponse {
  data: {
    message: string;
    user: IProfileData;
  };
}

export interface IRegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  gender: string;
  image: any; //changed from photoUrl to image
  about: string;
  skills: string;
}

export interface IOtpVerifier {
  email: string;
  hash: string;
  otp: string;
}

export interface IOtpGeneratorResponse {
  data: {
    message: string;
    hash: string;
  };
}

export interface IOtpVerificationResponse {
  data: {
    isVerified: boolean;
    message: string;
  };
}

export interface IRegistrationInitialState {
  //for OTP Generation
  otpGenerationSuccess: boolean;
  otpGenerationFailure: boolean;
  error: IError | null;
  otpLoading: boolean;
  userData: IRegistrationFormData;
  hash?: string | null;
  //for OTP Verification
  otpVerificationSuccess: boolean;
  otpVerificationFailure: boolean;
  verifyingOtp: boolean;
}

export interface IStepTwoData {
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  skills: string;
  about: string;
}

export interface ISignUpInitialState {
  signUpSuccessful: boolean;
  signUpFailure: boolean;
  userData: IRegistrationFormData | null;
  error: IError | null;
  loading: boolean;
}

export interface ISignupResponse {
  data: {
    message: string;
    user: IRegistrationFormData;
  };
}
export interface IEditProfileData {
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  skills: string;
  about: string;
  image: any;
}
export interface IFeed {
  id: string;
  about: string;
  photoUrl: string;
  firstName: string;
  lastName: string;
  setRightSwipe: (data: number) => void;

  feeds: IUserProfile[];
  setFeed: Dispatch<SetStateAction<IUserProfile[] | null>>;
}

export interface IUserProfile {
  about: string;
  age: number;
  email: string;
  firstName: string;
  gender: string;
  lastName: string;
  photoUrl: string;
  skills: string[];
  _id: string;
}

export interface IAcceptRejectConnectionResponse {
  data: {
    message: string;
  };
}

interface Participant {
  _id: string;
  firstName: string;
  lastName: string;
}

export interface Message {
  senderId: string;
  message: string;
}

export interface Chat {
  _id: string;
  participants: Participant[];
  messages: Message[];
}

export interface ChatResponse {
  data: {
    message: string;
    chats: Chat;
  };
}
