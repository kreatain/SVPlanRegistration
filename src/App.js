import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import EventList from "./components/Events/EventList";
import CreateEvent from "./components/Events/CreateEvent";
import EventDetail from "./components/Events/EventDetail";
import TaskList from "./components/Tasks/TaskList";
import AssignTask from "./components/Tasks/AssignTask";
import AddTask from "./components/Tasks/AddTask"; // New Component
import Notification from "./components/Notification/Notification";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";

import "./styles/App.css";
import "./styles/Navbar.css";
import "./styles/Auth.css";
import "./styles/AddTask.css";
import "./styles/TaskList.css";
import "./styles/CreateEvent.css";
import "./styles/EventDetail.css";
import "./styles/AssignTask.css";
import "./styles/Notification.css";

function AppRoutes() {
  // Access authentication state from Redux
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="App">
      {/* Conditionally render Navbar if authenticated */}
      {isAuthenticated && <Navbar />}

      <Routes>
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/events"
          element={
            <PrivateRoute>
              <EventList />
            </PrivateRoute>
          }
        />
        <Route
          path="/events/create"
          element={
            <PrivateRoute>
              <CreateEvent />
            </PrivateRoute>
          }
        />
        <Route
          path="/events/:id"
          element={
            <PrivateRoute>
              <EventDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <TaskList />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks/assign"
          element={
            <PrivateRoute>
              <AssignTask />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks/add"
          element={
            <PrivateRoute>
              <AddTask />
            </PrivateRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <PrivateRoute>
              <Notification />
            </PrivateRoute>
          }
        />

        {/* Default Route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  );
}

export default App;
