import { TOGGLE_EVENT_ATTENDANCE } from "../actions";

const initialState = {
  events: [],
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_EVENTS":
      return { ...state, events: action.payload };

    case "UPDATE_EVENT":
      return {
        ...state,
        events: state.events.map((event) =>
          event.event_id === action.payload.event_id
            ? { ...event, ...action.payload }
            : event
        ),
      };

    default:
      return state;
  }
};

export default eventReducer;