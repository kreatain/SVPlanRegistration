const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  users: [
    { id: 1, email: "admin@example.com", role: "admin" },
    {
      id: 2,
      email: "student1@example.com",
      role: "student",
    },
    {
      id: 3,
      email: "student2@example.com",
      role: "student",
    },
  ],
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}
