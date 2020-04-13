const initialState = {
  data: [],
  isLoading: false,
  error: false,
};
export const upload = (state = initialState, action) => {
  switch (action.type) {
    case "UPLOAD_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "UPLOAD_FULFILLED":
      return {
        ...state,
        data: action.payload.data.data,
        isLoading: false,
      };
    case "UPLOAD_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    default:
      return state;
  }
};
