import { TOGGLE_TASK_COMPLETION, ADD_TASK, ASSIGN_TASK } from "../actions";

// Define fixed categories
const TASK_CATEGORIES = ["Course", "DailySchedule", "Research", "Meeting"];

const initialState = {
  tasks: [
    // Mock tasks with category
    {
      id: 1,
      description: "Prepare for Math Exam",
      due_date: "2023-12-01",
      student_id: 2,
      course_id: 101,
      progress_status: "Pending",
      completed: false,
      category: "Course",
    },
    {
      id: 2,
      description: "Complete Science Project",
      due_date: "2023-11-15",
      student_id: 3,
      course_id: 102,
      progress_status: "In Progress",
      completed: false,
      category: "Research",
    },
  ],
};

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK:
    case ASSIGN_TASK:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            ...action.payload,
            completed: false,
            category: action.payload.category || "Course", // Default category if not provided
          },
        ],
      };
    case TOGGLE_TASK_COMPLETION:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    default:
      return state;
  }
}
