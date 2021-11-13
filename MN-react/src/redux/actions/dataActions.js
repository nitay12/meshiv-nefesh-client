import {
  SET_ANSWERS,
  LOADING_DATA,
  CONFIRM_ANSWER,
  UNCONFIRM_ANSWER,
  DELETE_ANSWER,
  SET_ERRORS,
  SET_ANSWER,
  LOADING_UI,
  CLEAR_ERRORS,
  POST_ANSWER,
  STOP_LOADING_UI
} from "../types";
import axios from "axios";

// Get all the answers
export const getAnswers = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/answers")
    .then((res) => {
      dispatch({ type: SET_ANSWERS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_ANSWERS, payload: [] });
    });
};
// Get an answer
export const getAnswer = (answerId) => (dispatch) => {
  dispatch({ type:LOADING_UI});
  axios.get(`/answer/${answerId}`)
  .then(
    res=>{
      dispatch({ type:SET_ANSWER, payload: res.data });
      dispatch({ type:STOP_LOADING_UI});
    }
  )
  .catch((err) => {
    console.error(err)
  })
}
// Post an answer
export const postAnswer = (newAnswer) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/answer", newAnswer)
    .then((res) => {
      dispatch({ type: POST_ANSWER, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};
// Confirm an answer
export const confirmAnswer = (answerId) => (dispatch) => {
  axios
    .get(`/answer/${answerId}/confirm`)
    .then((res) => {
      dispatch({ type: CONFIRM_ANSWER, payload: res.data });
    })
    .catch((err) => {
      console.error(err);
    });
};
// Unconfirm an answer
export const unconfirmAnswer = (answerId) => (dispatch) => {
  axios
    .get(`/answer/${answerId}/unconfirm`)
    .then((res) => {
      dispatch({ type: UNCONFIRM_ANSWER, payload: res.data });
    })
    .catch((err) => {
      console.error(err);
    });
};
//Delete an answer
export const deleteAnswer = (answerId) => (dispatch) => {
  axios
    .delete(`/answer/${answerId}`)
    .then(() => {
      dispatch({ type: DELETE_ANSWER, payload: answerId });
    })
    .catch((err) => {
      console.error(err);
    });
};
// Clear Errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type:CLEAR_ERRORS})
};
