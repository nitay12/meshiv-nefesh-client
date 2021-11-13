import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  CONFIRM_ANSWER,
  UNCONFIRM_ANSWER,
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  confirms: [],
  notifications: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case CONFIRM_ANSWER:
      return {
        ...state,
        confirms: [
          ...state.confirms,
          {
            userHandle: state.credentials.handle,
            answerId: action.payload.answerId,
          },
        ],
      };
    case UNCONFIRM_ANSWER:
      return {
        ...state,
        confirms: state.confirms.filter(
          (confirm) => confirm.answerId !== action.payload.answerId
        ),
      };
    default:
      return state;
  }
}
