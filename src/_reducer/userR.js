const initialState = {
  data: [],
  isLoading: false,
  error: false,
  user: "",
};

export const signIn = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "LOGIN_FULFILLED":
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
      };
    case "LOGIN_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    default:
      return state;
  }
};
export const signUP = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "REGISTER_FULFILLED":
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
      };
    case "REGISTER_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    default:
      return state;
  }
};

export const cekUser = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CEK_USER_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_CEK_USER_FULFILLED":
      return {
        ...state,
        data: action.payload.data.data,
        user: action.payload.data.data,
        isLoading: false,
      };
    case "GET_CEK_USER_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    default:
      return state;
  }
};

export const updateFoto = (state = initialState, action) => {
  switch (action.type) {
    case "UP_USER_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "UP_USER_FULFILLED":
      return {
        ...state,
        data: action.payload.data.data,
        isLoading: false,
      };
    case "UP_USER_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    default:
      return state;
  }
};
export const updatePass = (state = initialState, action) => {
  switch (action.type) {
    case "UP_PASS_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "UP_PASS_FULFILLED":
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
      };
    case "UP_PASS_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    default:
      return state;
  }
};
