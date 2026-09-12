import React, { useEffect, useState, useCallback } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { fetchTasks, createTask, updateTaskStatus, deleteTask } from "./api/api";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchTasks(search ? { search } : {});
      setTasks(res.data);
    } catch (err) {
      setError("Could not load tasks. Please check that the backend server is running.");
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    // Debounce search slightly so we don't call the API on every keystroke
    const timer = setTimeout(() => {
      loadTasks();
    }, 300);
    return () => clearTimeout(timer);
  }, [loadTasks]);

  const handleAdd = async (taskData) => {
    setError("");
    try {
      await createTask(taskData);
      loadTasks();
    } catch (err) {
      setError("Failed to add task.");
    }
  };

  const handleToggleComplete = async (task) => {
    setError("");
    try {
      await updateTaskStatus(task._id, {
        completed: !task.completed,
        status: !task.completed ? "completed" : "pending",
      });
      loadTasks();
    } catch (err) {
      setError("Failed to update task.");
    }
  };

  const handleDelete = async (id) => {
    setError("");
    try {
      await deleteTask(id);
      loadTasks();
    } catch (err) {
      setError("Failed to delete task.");
    }
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>

      <TaskForm onAdd={handleAdd} />

      <input
        type="text"
        className="search-box"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {error && <p className="error-text">{error}</p>}

      <TaskList
        tasks={tasks}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDelete}
        loading={loading}
      />
    </div>
  );
}

export default App;
