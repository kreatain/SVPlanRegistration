import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../../styles/TaskList.css";
import { getAllTasks } from "../../apiService";
import { updateTask } from "../../apiService";
import { setTasks } from "../../redux/actions";

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.task);
  const { user } = useSelector((state) => state.auth);
  const TASK_CATEGORIES = ["Course", "DailySchedule", "Research", "Meeting"];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", ...TASK_CATEGORIES];
  const currentDate = new Date();

  const [loading, setLoading] = useState(false);

  const checkAndUpdateOverdueTasks = async (taskList) => {
    const overdueUpdates = taskList
      .filter(
        (task) =>
          task.taskStatus !== "Completed" &&
          task.dueDate &&
          new Date(task.dueDate) < currentDate
      )
      .map(async (task) => {
        const updatedTaskData = {
          ...task,
          taskStatus: "Overdue",
        };
        try {
          const response = await updateTask(user.email, task.taskId, updatedTaskData);
          if (response && response.data) {
           
            dispatch({
              type: "UPDATE_TASK",
              payload: response.data, 
            });
          }
        } catch (error) {
          console.error(`Failed to update task ${task.taskId} to Overdue`, error);
        }
      });
  
    await Promise.all(overdueUpdates);
  

    const refreshedTasks = await getAllTasks(user.email);
    if (refreshedTasks && refreshedTasks.data) {
      dispatch(setTasks(refreshedTasks.data.tasks)); 
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user?.email) return;

      setLoading(true);
      try {
        const response = await getAllTasks(user.email);
        if (response && response.data) {
          const fetchedTasks = response.data.tasks;
          dispatch(setTasks(fetchedTasks));
          await checkAndUpdateOverdueTasks(fetchedTasks); 
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        alert("Failed to fetch tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user.email, dispatch]);

  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

  const handleToggleCompletion = async (task) => {
    const dueDate = new Date(task.dueDate);
    const isOverdue = dueDate < currentDate;

    const updatedTaskData = {
      taskName: task.taskName,
      description: task.description,
      dueDate: task.dueDate,
      taskStatus:
        task.taskStatus === "Completed"
          ? isOverdue
            ? "Overdue"
            : "In process"
          : "Completed",
      taskCategory: task.taskCategory,
    };

    try {
      const response = await updateTask(user.email, task.taskId, updatedTaskData);
      if (response && response.data) {
        const updatedTask = response.data;
        dispatch({
          type: "UPDATE_TASK",
          payload: updatedTask,
        });
        alert("Task status updated successfully!");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task status. Please try again.");
    }
  };

  const filteredTasks = Array.isArray(tasks)
    ? selectedCategory === "All"
      ? tasks
      : tasks.filter((task) => task.taskCategory === selectedCategory)
    : [];

  const completedTasks = filteredTasks.filter(
    (task) => task.taskStatus === "Completed"
  );
  const pendingTasks = filteredTasks.filter(
    (task) => task.taskStatus !== "Completed"
  );

  const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };
  
  const isOverdue = (task) =>
    task.dueDate && new Date(task.dueDate) < currentDate;
  
  return (
    <div className="task-container">
      <h2>Your Tasks</h2>
      <Link to="/tasks/add" className="btn-primary">
        Add New Task
      </Link>
      <div className="filter-bar">
        <label htmlFor="category-filter">Filter by Category:</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <div className="task-list">
          {/* Pending Tasks */}
          <h3>Pending Tasks</h3>
          {pendingTasks.length > 0 ? (
            pendingTasks.map((task) => (
              <div
                key={task.taskId}
                className={`task-card ${isOverdue(task) ? "overdue" : ""}`}
              >
                <input
                  type="checkbox"
                  className="task-checkbox"
                  checked={task.taskStatus === "Completed"}
                  onChange={() => handleToggleCompletion(task)}
                  aria-label={`Mark task "${task.taskName}" as completed`}
                />
                <h3>{task.taskName}</h3>
                <p>
                  <strong>Description:</strong> {task.description}
                </p>
                <p>
                  <strong>Due Date:</strong>{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleString()
                    : "No Due Date"}
                </p>
                <p className="status">
                  <strong>Status:</strong> {task.taskStatus}
                </p>
                <p>
                  <strong>Category:</strong> {task.taskCategory}
                </p>
                {task.file && (
                  <p>
                    <strong>File:</strong>{" "}
                    <a
                      href={task.file.filePath}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download File
                    </a>
                  </p>
                )}
              </div>
            ))
          ) : (
            <p>No pending tasks available.</p>
          )}

          {/* Completed Tasks */}
          <h3>Completed Tasks</h3>
          {completedTasks.length > 0 ? (
            completedTasks.map((task) => (
              <div key={task.taskId} className="task-card">
                <input
                  type="checkbox"
                  className="task-checkbox"
                  checked={task.taskStatus === "Completed"}
                  onChange={() => handleToggleCompletion(task)}
                  aria-label={`Mark task "${task.taskName}" as uncompleted`}
                />
                <h3>{task.taskName}</h3>
                <p>
                  <strong>Description:</strong> {task.description}
                </p>
                <p>
                  <strong>Due Date:</strong>{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleString()
                    : "No Due Date"}
                </p>
                <p>
                  <strong>Status:</strong> {task.taskStatus}
                </p>
                <p>
                  <strong>Category:</strong> {task.taskCategory}
                </p>
                {task.file && (
                  <p>
                    <strong>File:</strong>{" "}
                    <a
                      href={task.file.filePath}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download File
                    </a>
                  </p>
                )}
              </div>
            ))
          ) : (
            <p>No completed tasks available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskList;