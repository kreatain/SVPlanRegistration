import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/AssignTask.css";

const AssignTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, users } = useSelector((state) => state.auth);
  const { courses } = useSelector((state) => state.event);

  const [formData, setFormData] = useState({
    description: "",
    due_date: "",
    student_id: "",
    course_id: "",
  });

  const { description, due_date, student_id, course_id } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAssign = (e) => {
    e.preventDefault();
    // For simulation purposes only
    dispatch({
      type: "ASSIGN_TASK",
      payload: {
        id: Date.now(),
        description,
        due_date,
        student_id: parseInt(student_id),
        course_id: parseInt(course_id),
        progress_status: "Pending",
      },
    });
    navigate("/tasks");
    alert("Task Assigned Successfully! (Mock)");
  };

  // Redirect non-admin users
  if (user.role !== "Admin") {
    navigate("/tasks");
    return null;
  }

  return (
    <div className="assign-task-container">
      <h2>Assign New Task</h2>
      <form onSubmit={handleAssign} className="assign-task-form">
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
          <label>Select Student:</label>
          <select
            name="student_id"
            value={student_id}
            onChange={handleChange}
            required
          >
            <option value="">--Select Student--</option>
            {users
              .filter((user) => user.role === "student")
              .map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username} ({user.email})
                </option>
              ))}
          </select>
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
          Assign Task
        </button>
      </form>
      <Link to="/tasks" className="btn-secondary">
        &larr; Back to Tasks
      </Link>
    </div>
  );
};

export default AssignTask;
