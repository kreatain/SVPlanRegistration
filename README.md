# SV Plan Registration System - Front End Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Components](#components)
4. [State Management](#state-management)
5. [Routing](#routing)
6. [Styling](#styling)

---

## Project Overview

The **SV Plan Registration System** front end is built with **React** and **Redux**, offering a user-friendly interface for managing events, event notifications, and tasks. It aims to provide a comprehensive registration and management experience for students and administrators.

## Features

- **User Authentication**
  - Register and log in using email.
  - Protected routes accessible only to authenticated users.

- **Navbar**
  - Navigation bar based on user authentication status.

- **Event Management**
  - View, create, and manage events for Admin and view events for Students.
  - Detailed event information pages.

- **Task Management**
  - Students can add new tasks with descriptions, due dates, and file uploads (accepts PDF, DOCX, PNG, and JPG).
  - View and manage pending and completed tasks.

- **Notifications**
  - Students can receive and view notifications related to events posted by Admin.

- **ChatBot**
  - Interactive chatbot interface for real-time assistance.

## Components

### Authentication Components
- **Login**
  - Path: `./src/components/Auth/login`
  - Function: User login functionality.

- **Register**
  - Path: `./src/components/Auth/register`
  - Function: User registration functionality.

### Navbar
- **Location:** `./src/components/Navbar.js`
- **Function:** Provides navigation links based on user role and authentication status.

### Event Components
- **EventList**
  - Path: `./src/components/Events/EventList`
  - Function: Displays a list of all events.

- **CreateEvent**
  - Path: `./src/components/Events/CreateEvent`
  - Function: Allows admins to create new events.

- **EventDetail**
  - Path: `./src/components/Events/EventDetail`
  - Function: Shows detailed information about a specific event.

### Task Components
- **TaskList**
  - Path: `./src/components/Tasks/TaskList`
  - Function: Lists all tasks for the authenticated user.

- **AddTask**
  - Path: `./src/components/Tasks/AddTask`
  - Function: Enables users to add new tasks with file uploads.

- **AssignTask**
  - Path: `./src/components/Tasks/AssignTask`
  - Function: Allows students to assign tasks to a specific course.

### Notification
- **Path:** `./src/components/Notification/Notification`
- **Function:** Displays user-specific notifications.

### ChatBot
- **Location:** `./src/components/ChatBot.js`
- **Function:** Provides an interactive chatbot interface for user assistance.

### PrivateRoute
- **Location:** `./src/components/PrivateRoute.js`
- **Function:** Protects routes, ensuring only authenticated users can access them.

## State Management

- **Redux Store**
  - **Location:** `./src/redux/store.js`
  - **Function:** Centralizes application state for consistent data flow.

- **Actions & Reducers**
  - **Location:** `./src/redux/actions.js` and `./src/redux/reducers/`
  - **Function:** Manage state changes in response to user interactions and API responses.

## Routing

- **React Router**
  - **Configuration:** Defined in `./src/App.js`
  - **Protected Routes:** Implemented using the `PrivateRoute` component to secure sensitive pages.

## Styling

- **CSS Files**
  - **Location:** `./src/styles/`
  - **Function:** Provides reusable styles for components.

- **Style Files:**
  - `App.css`
  - `Navbar.css`
  - `Auth.css`
  - `AddTask.css`
  - `TaskList.css`
  - `CreateEvent.css`
  - `EventDetail.css`
  - `AssignTask.css`
  - `Notification.css`
  - `ChatBot.css`
  - `Buttons.css`
  - `Variables.css`
