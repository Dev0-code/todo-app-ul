import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddOrEdit = () => {
    if (!task) {
        return;
    }

    if (editIndex !== null) {
      const updatedTasks = [tasks];
      updatedTasks[editIndex] = task;
      setTasks(updatedTasks);
    } else {
      setTasks([tasks, task]);
    }
    setTask('');
  };

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setTask(tasks[index]);
    setEditIndex(index);
  };

  return (
    <div className="container-fluid mt-5">
      <div className='container p-5'>
          <h1 className="text-center mb-4">Todo App</h1>
          <div className="mb-3 d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="Enter task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button className="btn btn-primary mt-2" onClick={handleAddOrEdit}>
              {editIndex !== null ? 'Update' : 'Add'}
            </button>
          </div>
          <ul className="list-group">
            {tasks.map((t, i) => (
              <li key={i} className="list-group-item d-flex justify-content-between">
                {t}
                <div>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(i)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(i)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
      </div>
    </div>
  );
};

export default App;
