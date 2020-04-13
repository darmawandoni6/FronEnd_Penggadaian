const initialState = {
  data: [],
  isLoading: false,
  error: false
};

export const SN = (state = initialState, action) => {
  switch (action.type) {
    case "SN_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case "SN_FULFILLED":
      return {
        ...state,
        data: action.payload.data.cek,
        isLoading: false
      };
    case "SN_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: true
      };

    default:
      return state;
  }
};
