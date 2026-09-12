const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/tasks";

// Helper to handle fetch responses and errors consistently
async function handleResponse(res) {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

// Get all tasks, optionally filtered by search text or status
export const fetchTasks = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const url = query ? `${API_URL}?${query}` : API_URL;
  const res = await fetch(url);
  return handleResponse(res);
};

// Create a new task
export const createTask = async (taskData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  });
  return handleResponse(res);
};

// Update a task (title, description, etc.)
export const updateTask = async (id, taskData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  });
  return handleResponse(res);
};

// Update only the status / completed flag
export const updateTaskStatus = async (id, statusData) => {
  const res = await fetch(`${API_URL}/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(statusData),
  });
  return handleResponse(res);
};

// Delete a task
export const deleteTask = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
};
