import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllAnswers = createAsyncThunk("data/getAnswers", async () => {
  const response = await axios.get("/answers");
  return response.data;
});

export const getAnswer = createAsyncThunk(
  "data/getAnswer",
  async (answerId) => {
    const response = await axios.get(`/answer/${answerId}`);
    console.log(response.data);
    return response.data;
  }
);
