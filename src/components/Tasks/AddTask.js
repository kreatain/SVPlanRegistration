import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/AddTask.css";
import { addTask } from "../../redux/actions";
import { uploadFile } from "../../apiService"; // Assuming `uploadFile` is exported from your API file

const AddTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { courses } = useSelector((state) => state.event);

  const TASK_CATEGORIES = ["Course", "DailySchedule", "Research", "Meeting"];

  const [formData, setFormData] = useState({
    description: "",
    due_date: "",
    course_id: "",
    file: null,
    category: TASK_CATEGORIES[0],
  });

  const { description, due_date, course_id, file, category } = formData;

  const [uploading, setUploading] = useState(false);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "file" && files && files[0]) {
      const file = files[0];
      setUploading(true); // Show loading indicator

      try {
        // Convert file to Base64
        const reader = new FileReader();
        reader.onloadend = async () => {
          
          const base64File = reader.result.split(",")[1]; // Remove the prefix
          console.log("Base64 file content:", base64File);
          // Call the `uploadFile` API
          const response = await uploadFile(user.email, base64File);

          if (response && response.data) {
            const { task, file: uploadedFile } = response.data;

            // Update form fields with API response
            setFormData((prevData) => ({
              ...prevData,
              description: task.description || prevData.description,
              due_date: task.dueDate || prevData.due_date,
              file: uploadedFile.filePath, // Use the file path from the API
            }));
          }
        };

        reader.readAsDataURL(file); // Convert file to Base64
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("File upload failed. Please try again.");
      } finally {
        setUploading(false); // Hide loading indicator
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    if (!description || !due_date || !category) {
      alert("Please fill in all required fields.");
      return;
    }

    const taskData = {
      id: Date.now(),
      description,
      due_date,
      student_id: user.id,
      course_id: course_id ? parseInt(course_id) : null,
      progress_status: "Pending",
      file: file, // Use the file path returned from the API
      category,
    };

    dispatch(addTask(taskData));
    navigate("/tasks");
    alert("Task Added Successfully!");
  };

  return (
    <div className="add-task-container">
      <h2>Add New Task</h2>
      <form onSubmit={handleAddTask} className="add-task-form">
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
            name="due_date"
            value={due_date}
            onChange={(e) =>
              setFormData({ ...formData, due_date: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Select Course:</label>
          <select
            name="course_id"
            value={course_id}
            onChange={(e) =>
              setFormData({ ...formData, course_id: e.target.value })
            }
          >
            <option value="">--Select Course--</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.course_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Select Category:</label>
          <select
            name="category"
            value={category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
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
          {uploading ? "Processing..." : "Add Task"}
        </button>
      </form>
      <Link to="/tasks" className="btn-secondary">
        &larr; Back to Tasks
      </Link>
    </div>
  );
};

export default AddTask;