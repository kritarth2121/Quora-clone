import {combineReducers} from "redux";
import userReducer from "../reducer/userSlice";
import questionReducer from "../reducer/questionSlice";

const appReducer = combineReducers({
    user: userReducer,
    question: questionReducer,
});

export const rootReducer = (state: any, action: any) => appReducer(state, action);

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
