const initialState = {
  data: [],
  isLoading: false,
  error: false,
  vbunga: 0
};

export const bunga = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BUNGA_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case "GET_BUNGA_FULFILLED":
      const data = action.payload.data.data;
      let vvBunga = 0;
      if (data !== null) vvBunga = data.BUNGA;
      return {
        ...state,
        data,
        vbunga: vvBunga,
        isLoading: false
      };
    case "GET_BUNGA_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case "ADD_BUNGA":
      return {
        vbunga: action.data
      };
    default:
      return state;
  }
};
