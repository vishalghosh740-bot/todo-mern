import React from "react";

function TaskList({ tasks, onToggleComplete, onDelete, loading }) {
  if (loading) {
    return <p className="info-text">Loading tasks...</p>;
  }

  if (tasks.length === 0) {
    return <p className="info-text">No tasks found.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task._id} className={task.completed ? "task completed" : "task"}>
          <label>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task)}
            />
            <span className="task-title">{task.title}</span>
          </label>
          {task.description && <p className="task-desc">{task.description}</p>}
          <span className="task-status">{task.status}</span>
          <button onClick={() => onDelete(task._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
