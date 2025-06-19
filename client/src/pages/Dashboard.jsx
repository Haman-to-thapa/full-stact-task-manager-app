import React, { useEffect, useState } from 'react'
import { FiLogOut, FiTrash2, FiCheckCircle, FiCircle } from "react-icons/fi";
import { usetAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { token, logout, user } = usetAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks()
  }, [])

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);


  const fetchTasks = async () => {
    setLoading(true);
    try {

      const res = await axios.get('http://localhost:8000/api/tasks', {
        headers: { Authorization: token }
      })
      setTasks(res.data.tasks)
    } catch (error) {
      console.error("Fetch tasks error:", error.response ? error.response.data : error.message);
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  }

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:8000/api/tasks", { title, description }, {
        headers: { Authorization: token }
      });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      setError("Failed to add Task")
    } finally {
      setLoading(false);
    }
  }

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`http://localhost:8000/api/tasks/${id}`, {
        title: editTitle,
        description: editDescription
      }, {
        headers: { Authorization: token }
      });
      setEditingId(null);
      setEditTitle("");
      setEditDescription("");
      fetchTasks();
    } catch (err) {
      setError("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${id}`, {
        headers: { Authorization: token }
      });
      fetchTasks();
    } catch (error) {
      setError("Failed to delete task")
    } finally {
      setLoading(false);
    }
  }

  const handleToggle = async (task) => {
    try {
      await axios.put(`http://localhost:8000/api/tasks/${task._id}`, {
        completed: !task.completed
      }, {
        headers: { Authorization: token }
      });
      fetchTasks();
    } catch (err) {
      setError("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center py-10 px-2">
      <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl p-8 w-full max-w-2xl">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800 drop-shadow-lg mb-1">
              Welcome, <span className="text-blue-600">{user?.fullName || "User"}</span>
            </h2>
            <p className="text-gray-500">Manage your tasks efficiently</p>
          </div>
          <button
            onClick={logout}
            className="mt-4 sm:mt-0 flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-pink-500 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-all duration-200"
          >
            <FiLogOut /> Logout
          </button>
        </div>

        <form
          onSubmit={handleAdd}
          className="flex flex-col sm:flex-row gap-3 mb-8 "
        >
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Task Title"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />
          <input
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Description"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 cursor-pointer"
          >
            Add Task
          </button>
        </form>

        {error && (
          <div className="mb-4 text-red-600 bg-red-100 border border-red-300 rounded px-4 py-2 text-center">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <svg className="animate-spin h-8 w-8 text-blue-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <span className="text-blue-600 font-semibold text-lg">Loading tasks...</span>
          </div>
        ) : (
          <ul className="space-y-4">
            {tasks.length === 0 && (
              <li className="text-center text-gray-400">No tasks yet. Add your first task!</li>
            )}
            {tasks.map(task => (
              <li
                key={task._id}
                className={`flex items-center justify-between bg-white bg-opacity-80 rounded-xl shadow p-4 transition-all ${task.completed ? "opacity-60" : ""}`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <button
                    onClick={() => handleToggle(task)}
                    className={`text-2xl focus:outline-none ${task.completed
                      ? "text-green-500 hover:text-green-600"
                      : "text-gray-400 hover:text-blue-500"
                      }`}
                    title={task.completed ? "Mark as Incomplete" : "Mark as Complete"}
                  >
                    {task.completed ? <FiCheckCircle /> : <FiCircle />}
                  </button>
                  {editingId === task._id ? (
                    <form
                      onSubmit={e => handleUpdate(e, task._id)}
                      className="flex flex-col sm:flex-row gap-2 flex-1 cursor-pointer"
                    >
                      <input
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                        className="px-2 py-1 rounded border border-gray-300 flex-1 cursor-pointer"
                        required
                      />
                      <input
                        value={editDescription}
                        onChange={e => setEditDescription(e.target.value)}
                        className="px-2 py-1 rounded border border-gray-300 flex-1 cursor-pointer"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <div className="flex-1">
                      <div className={`font-semibold text-lg ${task.completed ? "line-through text-gray-400 cursor-pointer" : "text-gray-800"}`}>
                        {task.title}
                      </div>
                      <div className="text-gray-500 text-sm cursor-pointer">{task.description}</div>
                    </div>
                  )}
                </div>
                {editingId !== task._id && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(task._id);
                        setEditTitle(task.title);
                        setEditDescription(task.description);
                      }}
                      className="text-blue-500 hover:text-blue-700 text-xl cursor-pointer focus:outline-none"
                      title="Edit Task"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="text-red-500 hover:text-red-700 text-xl cursor-pointer focus:outline-none"
                      title="Delete Task"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Dashboard