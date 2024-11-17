const initialState = {
  notifications: [
    {
      id: 1,
      message: 'Your task "Complete Project Report" is due soon.',
      date_sent: "2024-11-10T10:00:00Z",
    },
    {
      id: 2,
      message: 'New event "Tech Workshop" has been scheduled.',
      date_sent: "2024-10-20T12:30:00Z",
    },
  ],
  loading: false,
  error: null,
};

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    // Define actions as needed
    default:
      return state;
  }
}
