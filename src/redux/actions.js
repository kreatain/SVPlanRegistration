// src/redux/actions.js

// Action Types
export const TOGGLE_TASK_COMPLETION = "TOGGLE_TASK_COMPLETION";
export const ADD_TASK = "ADD_TASK";
export const ASSIGN_TASK = "ASSIGN_TASK";

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
