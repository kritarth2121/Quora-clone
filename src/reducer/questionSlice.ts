import {createSlice} from "@reduxjs/toolkit";
import {AppState} from ".";

export const questionSlice = createSlice({
    name: "question",
    initialState: {
        questionId: null,
        questionName: null,
    },
    reducers: {
        setQuestionInfo: (state, action) => {
            state.questionId = action.payload.questionId;
            state.questionName = action.payload.questionName;
        },
    },
});

export const {setQuestionInfo} = questionSlice.actions;

export const selectQuestionId = (state: AppState) => state.question.questionId;
export const selectQuestionName = (state: AppState) => state.question.questionName;

export default questionSlice.reducer;
