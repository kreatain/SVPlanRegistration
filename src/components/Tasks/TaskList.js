import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../../styles/TaskList.css";
import { toggleTaskCompletion } from "../../redux/actions"; // Correct import

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.task);
  const { user } = useSelector((state) => state.auth);
  const { courses } = useSelector((state) => state.event);

  // Get current date and time
  const currentDate = new Date();

  // Filter tasks based on user role
  const filteredTasks =
    user.role === "Admin"
      ? tasks // Admin sees all tasks
      : tasks.filter((task) => task.student_id === user.id); // Students see only their tasks

  // Separate completed and pending tasks
  const completedTasks = filteredTasks.filter((task) => task.completed);
  const pendingTasks = filteredTasks.filter((task) => !task.completed);

  // Identify overdue tasks from pending tasks
  const overdueTasks = pendingTasks.filter((task) => {
    const taskDueDate = new Date(task.due_date);
    return taskDueDate < currentDate;
  });

  // Adjust pending tasks to exclude overdue tasks
  const adjustedPendingTasks = pendingTasks.filter((task) => {
    const taskDueDate = new Date(task.due_date);
    return taskDueDate >= currentDate;
  });

  const handleToggleCompletion = (taskId) => {
    dispatch(toggleTaskCompletion(taskId));
  };

  return (
    <div className="task-container">
      <h2>Your Tasks</h2>
      {user.role === "Admin" ? (
        <Link to="/tasks/assign" className="btn-primary">
          Assign New Task
        </Link>
      ) : (
        <Link to="/tasks/add" className="btn-primary">
          Add New Task
        </Link>
      )}
      <div className="task-list">
        {/* Overdue Tasks Section */}
        {overdueTasks.length > 0 && (
          <>
            <h3>Overdue Tasks</h3>
            {overdueTasks.map((task) => (
              <div
                key={task.id}
                className={`task-card overdue ${
                  task.completed ? "completed" : ""
                }`}
              >
                <input
                  type="checkbox"
                  className="task-checkbox"
                  checked={task.completed || false}
                  onChange={() => handleToggleCompletion(task.id)}
                  aria-label={`Mark task "${task.description}" as completed`}
                />
                <h3>{task.description}</h3>
                <p>
                  <strong>Due Date:</strong>{" "}
                  {new Date(task.due_date).toLocaleString()}
                </p>
                <p>
                  <strong>Status:</strong> {task.progress_status}
                </p>
                <p>
                  <strong>Course:</strong>{" "}
                  {courses.find((c) => c.id === task.course_id)?.course_name ||
                    "N/A"}
                </p>
                {/* Added File Display */}
                {task.file_name && (
                  <p>
                    <strong>File:</strong>{" "}
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      {task.file_name}
                    </a>
                  </p>
                )}
              </div>
            ))}
          </>
        )}

        {/* Pending Tasks Section */}
        <h3>Pending Tasks</h3>
        {adjustedPendingTasks.length > 0 ? (
          adjustedPendingTasks.map((task) => (
            <div
              key={task.id}
              className={`task-card ${task.completed ? "completed" : ""}`}
            >
              <input
                type="checkbox"
                className="task-checkbox"
                checked={task.completed || false}
                onChange={() => handleToggleCompletion(task.id)}
                aria-label={`Mark task "${task.description}" as completed`}
              />
              <h3>{task.description}</h3>
              <p>
                <strong>Due Date:</strong>{" "}
                {new Date(task.due_date).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong> {task.progress_status}
              </p>
              <p>
                <strong>Course:</strong>{" "}
                {courses.find((c) => c.id === task.course_id)?.course_name ||
                  "N/A"}
              </p>
              {/* Added File Display */}
              {task.file_name && (
                <p>
                  <strong>File:</strong>{" "}
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    {task.file_name}
                  </a>
                </p>
              )}
            </div>
          ))
        ) : (
          <p>No pending tasks available.</p>
        )}
      </div>
      <div className="task-list completed-tasks">
        <h3>Completed Tasks</h3>
        {completedTasks.length > 0 ? (
          completedTasks.map((task) => (
            <div
              key={task.id}
              className={`task-card ${task.completed ? "completed" : ""}`}
            >
              <input
                type="checkbox"
                className="task-checkbox"
                checked={task.completed || false}
                onChange={() => handleToggleCompletion(task.id)}
                aria-label={`Mark task "${task.description}" as uncompleted`}
              />
              <h3>{task.description}</h3>
              <p>
                <strong>Due Date:</strong>{" "}
                {new Date(task.due_date).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong> {task.progress_status}
              </p>
              <p>
                <strong>Course:</strong>{" "}
                {courses.find((c) => c.id === task.course_id)?.course_name ||
                  "N/A"}
              </p>
              {/* Added File Display */}
              {task.file_name && (
                <p>
                  <strong>File:</strong>{" "}
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    {task.file_name}
                  </a>
                </p>
              )}
            </div>
          ))
        ) : (
          <p>No completed tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
