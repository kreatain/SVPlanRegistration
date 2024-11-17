import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/AddTask.css";

const AddTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { courses } = useSelector((state) => state.event);

  const [formData, setFormData] = useState({
    description: "",
    due_date: "",
    course_id: "",
  });

  const { description, due_date, course_id } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    // Simulate adding a new task
    dispatch({
      type: "ADD_TASK",
      payload: {
        id: Date.now(),
        description,
        due_date,
        student_id: user.id,
        course_id: parseInt(course_id),
        progress_status: "Pending",
      },
    });
    navigate("/tasks");
    alert("Task Added Successfully! (Mock)");
  };

  return (
    <div className="add-task-container">
      <h2>Add New Task</h2>
      <form onSubmit={handleAddTask} className="add-task-form">
        <div className="form-group">
          <label>Task Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            required
            placeholder="Enter task description"
          ></textarea>
        </div>
        <div className="form-group">
          <label>Due Date:</label>
          <input
            type="date"
            name="due_date"
            value={due_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Select Course:</label>
          <select
            name="course_id"
            value={course_id}
            onChange={handleChange}
            required
          >
            <option value="">--Select Course--</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.course_name}
              </option>
            ))}
          </select>
        </div>
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
