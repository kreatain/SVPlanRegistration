// Action Types
export const TOGGLE_TASK_COMPLETION = "TOGGLE_TASK_COMPLETION";
export const ADD_TASK = "ADD_TASK";
export const ASSIGN_TASK = "ASSIGN_TASK";
export const SET_TASKS = "SET_TASKS";
// New Event Action Types
export const TOGGLE_EVENT_ATTENDANCE = "TOGGLE_EVENT_ATTENDANCE";
export const ADD_NEW_EVENT = "ADD_NEW_EVENT"; // Newly added
// actions.js
export const UPDATE_TASK = "UPDATE_TASK";

// Action Creator for updating a task
export const updateTaskAction = (updatedTask) => ({
  type: UPDATE_TASK,
  payload: updatedTask,
});
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

export const setTasks = (tasks) => ({
  type: SET_TASKS,
  payload: tasks,
});

// New Event Action Creators
export const toggleEventAttendance = (eventId) => ({
  type: TOGGLE_EVENT_ATTENDANCE,
  payload: eventId,
});

export const addNewEvent = (event) => ({
  // Newly added
  type: ADD_NEW_EVENT,
  payload: event,
});
