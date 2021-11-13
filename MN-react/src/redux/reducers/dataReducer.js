import {
  SET_ANSWERS,
  SET_ANSWER,
  CONFIRM_ANSWER,
  UNCONFIRM_ANSWER,
  LOADING_DATA,
  DELETE_ANSWER,
  POST_ANSWER,
} from "../types";

const initialState = {
  answers: [],
  answer: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_ANSWERS:
      return {
        ...state,
        answers: action.payload,
        loading: false,
      };
    case SET_ANSWER:
      return {
        ...state,
        answer: action.payload,
      };
    case CONFIRM_ANSWER:
    case UNCONFIRM_ANSWER:
      var index = state.answers.findIndex(
        (answer) => answer.answerId === action.payload.answerId
      );
      state.answers[index] = action.payload;
      return {
        ...state,
      };
    case DELETE_ANSWER:
      index = state.answers.findIndex(
        (answer) => answer.answerId === action.payload
      );
      state.answers.splice(index, 1);
      return {
        ...state,
      };
    case POST_ANSWER:
      return {
        ...state,
        answers: [action.payload, ...state.answers],
      };
    default:
      return state;
  }
}
