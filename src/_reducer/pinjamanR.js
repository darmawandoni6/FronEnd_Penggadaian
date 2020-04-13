const initialState = {
  data: [],
  isLoading: false,
  error: false
};

export const addPinjaman = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PINJAMAN_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case "ADD_PINJAMAN_FULFILLED":
      return {
        ...state,
        data: action.payload.data,
        isLoading: false
      };
    case "ADD_PINJAMAN_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: true
      };
    default:
      return state;
  }
};

export const getPinjaman = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PINJAMAN_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case "GET_PINJAMAN_FULFILLED":
      return {
        ...state,
        data: action.payload.data.data,
        isLoading: false
      };
    case "GET_PINJAMAN_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: true
      };
    default:
      return state;
  }
};
