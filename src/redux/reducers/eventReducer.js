import { TOGGLE_EVENT_ATTENDANCE } from "../actions";

// For simulation purposes only
const initialState = {
  events: [
    {
      id: 1,
      name: "Tech Career Fair",
      description: "Connecting students with top tech companies.",
      happening_date: "2024-12-15T10:00:00",
      entry_date: "2024-11-01T00:00:00",
      admin_username: "admin1",
      attended: false,
      category: "Career Fair",
    },
    {
      id: 2,
      name: "Annual Research Showcase",
      description: "Presenting groundbreaking research projects.",
      happening_date: "2024-11-20T09:00:00",
      entry_date: "2024-10-15T00:00:00",
      admin_username: "admin2",
      attended: true,
      category: "Research Showcase",
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
    default:
      return state;
  }
}
