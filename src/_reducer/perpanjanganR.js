const initialState = {
  data: [],
  isLoading: false,
  error: false
};
export const addPerpanjangan = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PERPANJANGAN_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case "ADD_PERPANJANGAN_FULFILLED":
      return {
        ...state,
        data: action.payload.data,
        isLoading: false
      };
    case "ADD_PERPANJANGAN_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: true
      };
    default:
      return state;
  }
};
