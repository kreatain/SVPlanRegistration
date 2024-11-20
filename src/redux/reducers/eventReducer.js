import { TOGGLE_EVENT_ATTENDANCE } from "../actions";

// For simulation purposes only
const initialState = {
  events: [
    {
      id: 1,
      name: "Math Workshop",
      description: "An advanced workshop on calculus.",
      happening_date: "2023-11-20",
      entry_date: "2023-11-10",
      attended: false,
    },
    {
      id: 2,
      name: "Science Fair",
      description: "Annual science exhibition.",
      happening_date: "2023-12-05",
      entry_date: "2023-11-25",
      attended: false,
    },
  ],
  courses: [
    { id: 101, course_name: "Mathematics" },
    { id: 102, course_name: "Science" },
    { id: 103, course_name: "History" },
  ],
};

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_EVENT_ATTENDANCE:
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload
            ? { ...event, attended: !event.attended }
            : event
        ),
      };
    // Define other actions as needed
    default:
      return state;
  }
}
