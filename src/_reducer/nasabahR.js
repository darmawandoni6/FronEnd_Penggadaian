const initialState = {
  data: [],
  isLoading: false,
  error: false,
};

export const getNasabah = (state = initialState, action) => {
  switch (action.type) {
    case "GET_NASABAH_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_NASABAH_FULFILLED":
      return {
        ...state,
        data: action.payload.data.data,
        isLoading: false,
      };
    case "GET_NASABAH_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    default:
      return state;
  }
};
export const browseNasabah = (state = initialState, action) => {
  switch (action.type) {
    case "GET_NAS_BROWSE_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_NAS_BROWSE_FULFILLED":
      return {
        ...state,
        data: action.payload.data.data,
        isLoading: false,
      };
    case "GET_NAS_BROWSE_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    default:
      return state;
  }
};
export const searchNasabah = (state = initialState, action) => {
  switch (action.type) {
    case "GET_NASABAH_D_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_NASABAH_D_FULFILLED":
      return {
        ...state,
        data: action.payload.data.data,
        isLoading: false,
      };
    case "GET_NASABAH_D_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    default:
      return state;
  }
};

export const updateStatus = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_STATUS_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "UPDATE_STATUS_FULFILLED":
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
      };
    case "UPDATE_STATUS_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    default:
      return state;
  }
};
