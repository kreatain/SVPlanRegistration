import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/AddTask.css";
import { uploadFile, updateTask } from "../../apiService";

const AddTask = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const TASK_CATEGORIES = ["Course", "DailySchedule", "Research", "Meeting"];

  const [formData, setFormData] = useState({
    taskId: null, // Ensure taskId is included in formData
    taskName: "",
    description: "",
    dueDate: "",
    taskStatus: "In process",
    taskCategory: TASK_CATEGORIES[0],
    file: null,
  });

  const { taskId, taskName, description, dueDate, taskStatus, taskCategory, file } =
    formData;

  const [uploading, setUploading] = useState(false);

  const handleChange = async (e) => {
    const { name, files } = e.target;

    if (name === "file" && files && files[0]) {
      const file = files[0];
      setUploading(true);

      try {
        if (!user.email) {
          alert("User email is not available. Please log in again.");
          return;
        }

        const response = await uploadFile(user.email, file);

        if (response && response.data) {
          const { task, file: uploadedFile } = response.data;

          setFormData((prevData) => ({
            ...prevData,
            taskId: task.taskId, // Save taskId from the response
            taskName: task.taskName || prevData.taskName,
            description: task.description || prevData.description,
            dueDate: task.dueDate || prevData.dueDate,
            file: uploadedFile.filePath,
          }));
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("File upload failed. Please try again.");
      } finally {
        setUploading(false);
      }
    } else {
      setFormData({ ...formData, [name]: e.target.value });
    }
  };

  const handleAddOrUpdateTask = async (e) => {
    e.preventDefault();
  
    if (!taskName || !description || !dueDate || !taskCategory) {
      alert("Please fill in all required fields.");
      return;
    }
  
    // Determine the status based on the due date
    const currentDate = new Date();
    const taskDueDate = new Date(dueDate);
    const updatedStatus = taskDueDate < currentDate ? "Overdue" : "In process";
  
    const taskData = {
      taskName,
      description,
      dueDate,
      taskStatus: updatedStatus, // Update the status dynamically
      taskCategory,
    };
  
    try {
      if (taskId) {
        // Update existing task
        const response = await updateTask(user.email, taskId, taskData);
        if (response && response.data) {
          alert("Task updated successfully!");
        }
      } else {
        // Adding a new task is not supported in this flow
        alert("Adding a new task is not implemented in this flow.");
      }
      navigate("/tasks");
    } catch (error) {
      console.error("Error handling task:", error);
      alert("Failed to process the task. Please try again.");
    }
  };
  

  return (
    <div className="add-task-container">
      <h2>{taskId ? "Update Task" : "Add New Task"}</h2>
      <form onSubmit={handleAddOrUpdateTask} className="add-task-form">
        <div className="form-group">
          <label>Upload File:</label>
          <input
            type="file"
            name="file"
            accept=".pdf,.doc,.docx,.jpg,.png"
            onChange={handleChange}
          />
          {uploading && <p>Uploading file... Please wait.</p>}
        </div>

        <div className="form-group">
          <label>Task Name:</label>
          <input
            type="text"
            name="taskName"
            value={taskName}
            onChange={(e) =>
              setFormData({ ...formData, taskName: e.target.value })
            }
            placeholder="Enter task name"
          />
        </div>

        <div className="form-group">
          <label>Task Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Enter task description"
          ></textarea>
        </div>

        <div className="form-group">
          <label>Due Date:</label>
          <input
            type="date"
            name="dueDate"
            value={dueDate}
            onChange={(e) =>
              setFormData({ ...formData, dueDate: e.target.value })
            }
          />
        </div>
        

        <div className="form-group">
          <label>Select Category:</label>
          <select
            name="taskCategory"
            value={taskCategory}
            onChange={(e) =>
              setFormData({ ...formData, taskCategory: e.target.value })
            }
            required
          >
            {TASK_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-primary" disabled={uploading}>
          {uploading ? "Processing..." : taskId ? "Update Task" : "Add Task"}
        </button>
      </form>
      <Link to="/tasks" className="btn-secondary">
        &larr; Back to Tasks
      </Link>
    </div>
  );
};

export default AddTask;