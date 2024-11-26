



import { SET_TASKS, UPDATE_TASK, ADD_TASK, TOGGLE_TASK_COMPLETION } from "../actions";
const TASK_CATEGORIES = ["Course", "DailySchedule", "Research", "Meeting"];
const initialState = {
  tasks: [], 
};

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TASKS:
      return { ...state, tasks: action.payload };

    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };

      case "UPDATE_TASK":
        return {
          ...state,
          tasks: state.tasks.map((task) =>
            task.taskId === action.payload.taskId
              ? { ...task, ...action.payload, file: task.file || action.payload.file }
              : task
          ),
        };

    case TOGGLE_TASK_COMPLETION:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.taskId === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };

    default:
      return state;
  }
}