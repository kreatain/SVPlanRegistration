// Action Types
export const TOGGLE_TASK_COMPLETION = "TOGGLE_TASK_COMPLETION";
export const ADD_TASK = "ADD_TASK";
export const ASSIGN_TASK = "ASSIGN_TASK";

// New Event Action Types
export const TOGGLE_EVENT_ATTENDANCE = "TOGGLE_EVENT_ATTENDANCE";

// Action Creators
export const toggleTaskCompletion = (taskId) => ({
  type: TOGGLE_TASK_COMPLETION,
  payload: taskId,
});

export const addTask = (task) => ({
  type: ADD_TASK,
  payload: task,
});

export const assignTask = (task) => ({
  type: ASSIGN_TASK,
  payload: task,
});

// New Event Action Creators
export const toggleEventAttendance = (eventId) => ({
  type: TOGGLE_EVENT_ATTENDANCE,
  payload: eventId,
});
