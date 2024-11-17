// For simulation purposes only
const initialState = {
  events: [
    {
      id: 1,
      name: "Math Workshop",
      description: "An advanced workshop on calculus.",
      happening_date: "2023-11-20",
      entry_date: "2023-11-10",
    },
    {
      id: 2,
      name: "Science Fair",
      description: "Annual science exhibition.",
      happening_date: "2023-12-05",
      entry_date: "2023-11-25",
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
    // Define actions as needed
    default:
      return state;
  }
}
