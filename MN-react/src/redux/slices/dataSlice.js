import { createSlice } from "@reduxjs/toolkit";
import { getAllAnswers, getAnswer } from "../actions/rtkDataActions";

const initialState = {
  answers: [],
  answer: {},
  loading: false,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllAnswers.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getAllAnswers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.answers = payload;
    },
    [getAnswer.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getAnswer.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.answer = payload;
    },
  },
});

export const {} = dataSlice.actions;
export const dataSelector = (state) => state.rtkData;
export default dataSlice.reducer;
