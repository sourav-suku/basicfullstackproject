import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = 'http://localhost:5000/api';

  // Fetch all tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load tasks. Make sure the server is running on port 5000');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/tasks`, {
        title,
        description,
      });
      setTasks([response.data, ...tasks]);
      setTitle('');
      setDescription('');
      setError('');
    } catch (err) {
      setError('Failed to add task');
      console.error(err);
    }
  };

  // Toggle task completion
  const toggleTask = async (id, currentTask) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`, {
        ...currentTask,
        completed: !currentTask.completed,
      });
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Manager</h1>
        <p>A simple full-stack task management application</p>
      </header>

      <main className="container">
        {error && <div className="error-message">{error}</div>}

        {/* Add Task Form */}
        <div className="add-task-section">
          <h2>Add New Task</h2>
          <form onSubmit={handleAddTask}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Task title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Task description (optional)..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea-field"
                rows="3"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Task
            </button>
          </form>
        </div>

        {/* Tasks List */}
        <div className="tasks-section">
          <h2>Tasks ({tasks.length})</h2>
          {loading ? (
            <p>Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p>No tasks yet. Add one to get started!</p>
          ) : (
            <ul className="task-list">
              {tasks.map((task) => (
                <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                  <div className="task-content">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id, task)}
                      className="task-checkbox"
                    />
                    <div className="task-text">
                      <h3>{task.title}</h3>
                      {task.description && <p>{task.description}</p>}
                      <small>{new Date(task.created_at).toLocaleDateString()}</small>
                    </div>
                  </div>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
