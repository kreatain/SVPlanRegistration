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
  const [sortOrder, setSortOrder] = useState("asc"); 
  const [statusFilter, setStatusFilter] = useState("All"); 
  const categories = ["All", ...TASK_CATEGORIES];
  const currentDate = new Date();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user?.email) return;

      setLoading(true);
      try {
        const response = await getAllTasks(user.email);
        if (response && response.data) {
          dispatch(setTasks(response.data.tasks));
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

  const handleSortOrderChange = (e) => setSortOrder(e.target.value);

  const handleStatusFilterChange = (e) => setStatusFilter(e.target.value);

  const handleToggleCompletion = async (task) => {
    const dueDate = new Date(task.dueDate);
    const isOverdue = dueDate && dueDate < currentDate;

    const updatedTaskData = {
      taskName: task.taskName,
      description: task.description,
      dueDate: task.dueDate,
      taskStatus:
        task.taskStatus === "Completed"
          ? isOverdue
            ? "Overdue"
            : "In Process"
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


  const statusFilteredTasks =
    statusFilter === "All"
      ? filteredTasks
      : filteredTasks.filter((task) => task.taskStatus === statusFilter);

 
  const sortedTasks = [...statusFilteredTasks].sort((a, b) => {
    const dateA = new Date(a.dueDate || "9999-12-31");
    const dateB = new Date(b.dueDate || "9999-12-31");
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="task-container">
      <h2>Your Tasks</h2>
      <Link to="/tasks/add" className="btn-primary">
        Add New Task
      </Link>
      <div className="filter-bar">
        <div className="filter-item">
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

        <div className="filter-item">
          <label htmlFor="status-filter">Filter by Status:</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={handleStatusFilterChange}
          >
            <option value="All">All</option>
            <option value="In Process">In Process</option>
            <option value="Overdue">Overdue</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="sort-order">Sort Due Date By:</label>
          <select
            id="sort-order"
            value={sortOrder}
            onChange={handleSortOrderChange}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <div className="task-list">
          {sortedTasks.length > 0 ? (
            sortedTasks.map((task) => (
              <div
                key={task.taskId}
                className={`task-card ${task.taskStatus === "Overdue" ? "overdue" : ""}`}
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
            <p>No tasks available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskList;