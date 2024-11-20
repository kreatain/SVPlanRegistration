import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/AddTask.css";
import { addTask } from "../../redux/actions"; // Import the addTask action creator

const AddTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { courses } = useSelector((state) => state.event);

  const [formData, setFormData] = useState({
    description: "",
    due_date: "",
    course_id: "",
    file: null,
  });

  const { description, due_date, course_id, file } = formData;

  // State to manage edit mode for AI-generated fields
  const [isDescriptionEditable, setIsDescriptionEditable] = useState(false);
  const [isDueDateEditable, setIsDueDateEditable] = useState(false);

  // Effect to simulate AI processing when a file is uploaded
  useEffect(() => {
    if (file) {
      // Simulate AI processing delay
      setTimeout(() => {
        // Mock AI-generated description and due date
        const aiGeneratedDescription = `Auto-generated description based on the uploaded file: ${file.name}`;
        const aiGeneratedDueDate = generateDueDate();

        setFormData((prevData) => ({
          ...prevData,
          description: aiGeneratedDescription,
          due_date: aiGeneratedDueDate,
        }));
      }, 1000); // Simulate a 1-second delay
    }
  }, [file]);

  // Function to generate a mock due date (e.g., 7 days from today)
  const generateDueDate = () => {
    const today = new Date();
    const dueDate = new Date(today);
    dueDate.setDate(today.getDate() + 7);
    return dueDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle task submission
  const handleAddTask = (e) => {
    e.preventDefault();
    // Prepare task data
    const taskData = {
      id: Date.now(),
      description,
      due_date,
      student_id: user.id,
      course_id: course_id ? parseInt(course_id) : null, // Handle optional course_id
      progress_status: "Pending",
      file_name: file ? file.name : null,
    };
    // Dispatch the addTask action with formData
    dispatch(addTask(taskData));
    navigate("/tasks");
    alert("Task Added Successfully! (Mock)");
  };

  // Handlers to toggle edit mode
  const handleEditDescription = () => {
    setIsDescriptionEditable(true);
  };

  const handleEditDueDate = () => {
    setIsDueDateEditable(true);
  };

  return (
    <div className="add-task-container">
      <h2>Add New Task</h2>
      <form onSubmit={handleAddTask} className="add-task-form">
        {/* 1. File Upload Field (Moved to Top) */}
        <div className="form-group">
          <label>Upload File:</label>
          <input
            type="file"
            name="file"
            accept=".pdf,.doc,.docx,.jpg,.png"
            onChange={handleChange}
          />
          <p className="ai-message">
            If you choose to upload a file, AI can help generate the assignment
            description and due date after uploading.
          </p>
        </div>

        {/* 2. AI-Generated Description Box */}
        {file && (
          <div className="ai-generated-box">
            <h3>AI Generated Description</h3>
            <textarea
              name="description"
              value={description}
              onChange={handleChange}
              readOnly={!isDescriptionEditable}
              placeholder="AI-generated description will appear here..."
            ></textarea>
            {!isDescriptionEditable && (
              <button
                type="button"
                onClick={handleEditDescription}
                className="btn-secondary"
              >
                Edit Description
              </button>
            )}
          </div>
        )}

        {/* 3. AI-Generated Due Date Box */}
        {file && (
          <div className="ai-generated-box">
            <h3>AI Generated Due Date</h3>
            <input
              type="date"
              name="due_date"
              value={due_date}
              onChange={handleChange}
              readOnly={!isDueDateEditable}
            />
            {!isDueDateEditable && (
              <button
                type="button"
                onClick={handleEditDueDate}
                className="btn-secondary"
              >
                Edit Due Date
              </button>
            )}
          </div>
        )}

        {/* 4. Task Description (Optional) */}
        <div className="form-group">
          <label>Task Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="Enter task description (optional)"
          ></textarea>
        </div>

        {/* 5. Due Date (Optional) */}
        <div className="form-group">
          <label>Due Date:</label>
          <input
            type="date"
            name="due_date"
            value={due_date}
            onChange={handleChange}
          />
        </div>

        {/* 6. Select Course (Optional) */}
        <div className="form-group">
          <label>Select Course:</label>
          <select name="course_id" value={course_id} onChange={handleChange}>
            <option value="">--Select Course (optional)--</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.course_name}
              </option>
            ))}
          </select>
        </div>

        {/* 7. Submit Button */}
        <button type="submit" className="btn-primary">
          Add Task
        </button>
      </form>
      <Link to="/tasks" className="btn-secondary">
        &larr; Back to Tasks
      </Link>
    </div>
  );
};

export default AddTask;
