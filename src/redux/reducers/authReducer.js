const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: !!localStorage.getItem("user"),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "LOGOUT":
      localStorage.removeItem("user");
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        tasks: [], events: [],
      };
    default:
      return state;
  }
};

export default authReducer;