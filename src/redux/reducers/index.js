import { combineReducers } from "redux";
import authReducer from "./authReducer";
import eventReducer from "./eventReducer";
import taskReducer from "./taskReducer";
import notificationReducer from "./notificationReducer";

export default combineReducers({
  auth: authReducer,
  event: eventReducer,
  task: taskReducer,
  notification: notificationReducer,
});
