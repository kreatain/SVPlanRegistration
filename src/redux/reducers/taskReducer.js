// For simulation purposes only
import { TOGGLE_TASK_COMPLETION, ADD_TASK, ASSIGN_TASK } from "../actions";

const initialState = {
  tasks: [
    // Mock tasks
    {
      id: 1,
      description: "Prepare for Math Exam",
      due_date: "2023-12-01",
      student_id: 2, // student1
      course_id: 101, // Example course
      progress_status: "Pending",
      completed: false, // Added field
    },
    {
      id: 2,
      description: "Complete Science Project",
      due_date: "2023-11-15",
      student_id: 3, // student2
      course_id: 102,
      progress_status: "In Progress",
      completed: false, // Added field
    },
  ],
};

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    case ASSIGN_TASK:
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, { ...action.payload, completed: false }],
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
