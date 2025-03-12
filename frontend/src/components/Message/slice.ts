import { createSlice } from "@reduxjs/toolkit";
import { IError, Message } from "../../Types/types";
import { PayloadAction } from "@reduxjs/toolkit";

interface IMessage {
  msgLoading: boolean;
  msgRetrieveSuccess: boolean;
  msgRetrieveFail: boolean;
  error: IError | null;
  messages: Message[];
  //to store new msgs to db
  msgSavedSuccess: boolean;
  msgSavedFail: boolean;
  msgSaving: boolean;
  errorWhileSaving: IError | null;
}

const initialState: IMessage = {
  msgLoading: false,
  msgRetrieveSuccess: false,
  msgRetrieveFail: false,
  error: null,
  messages: [],
  //intitial state to store new msgs
  msgSavedSuccess: false,
  msgSavedFail: false,
  msgSaving: false, //similar to loading
  errorWhileSaving: null,
};

const message = createSlice({
  name: "Messages",
  initialState,
  reducers: {
    oldMsgRequest: (state, _action: PayloadAction<{ friendsId: string }>) => {
      state.msgLoading = true;
      state.error = null;
    },
    oldMsgRetrieveSuccessfully: (state, action: PayloadAction<Message[]>) => {
      state.msgLoading = false;
      state.msgRetrieveSuccess = true;
      state.messages = [...state.messages, ...action.payload];
    },
    oldMsgRetrieveFailure: (state, action: PayloadAction<IError>) => {
      state.msgLoading = false;
      state.msgRetrieveFail = true;
      state.error = action.payload;
    },
    newMsgSaveRequest: (
      state,
      _action: PayloadAction<{ recieverId: string; msg: string }>
    ) => {
      state.msgSaving = true;
      state.errorWhileSaving = null;
    },
    newMsgSaveSucessfull: (state, _action: PayloadAction<string>) => {
      state.msgSaving = false;
      state.msgSavedSuccess = true;
    },
    newMsgSaveFailure: (state, action: PayloadAction<IError>) => {
      state.msgSaving = false;
      state.msgSavedFail = true;
      state.errorWhileSaving = action.payload;
    },
  },
});

export const {
  oldMsgRequest,
  oldMsgRetrieveFailure,
  oldMsgRetrieveSuccessfully,
  newMsgSaveFailure,
  newMsgSaveRequest,
  newMsgSaveSucessfull,
} = message.actions;
export default message.reducer;
