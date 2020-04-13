const initialState = {
  data: [],
  isLoading: false,
  error: false
};
export const getBarang = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BARANG_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case "GET_BARANG_FULFILLED":
      return {
        ...state,
        data: action.payload.data.data,
        isLoading: false
      };
    case "GET_BARANG_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: true
      };
    default:
      return state;
  }
};
