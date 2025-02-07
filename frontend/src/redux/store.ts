import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

//saga middleware intercepts the action before reaching to the reducer
//once api call done by the middleware it dispatches another action

//saga middleware initialization
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: reducers,
  //getDefaultMiddleware gives us default middleware like thunk
  //but then we add sagaMiddleware with the defaultMiddleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

//runs the middleware
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export default store;
