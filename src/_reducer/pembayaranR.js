const initialState = {
  data: [],
  isLoading: false,
  error: false,
};
export const addPembayaran = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PEMBAYARAN_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "ADD_PEMBAYARAN_FULFILLED":
      return {
        ...state,
        data: action.payload.data.data,
        isLoading: false,
      };
    case "ADD_PEMBAYARAN_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    default:
      return state;
  }
};

export const getPembayaran = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PEMBAYARAN_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_PEMBAYARAN_FULFILLED":
      return {
        ...state,
        data: action.payload.data.data,
        isLoading: false,
      };
    case "GET_PEMBAYARAN_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    default:
      return state;
  }
};
