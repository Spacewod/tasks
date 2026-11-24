import { useState, useEffect } from 'react';
import { FaTrash } from "react-icons/fa"
import { FaCheckSquare, FaRegSquare } from 'react-icons/fa';;
import '../App.css'; // Стили лежат на уровень выше

function Todo() {
  // 1. Состояния
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("my-react-tasks");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  // 2. Эффект сохранения
  useEffect(() => {
    localStorage.setItem("my-react-tasks", JSON.stringify(tasks));
  }, [tasks]);

  // 3. Функции
  const addTask = () => {
    if (input.trim() === "") return;
    const newTask = { id: Date.now(), text: input, done: false };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  // 4. Фильтрация
  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.done;
    if (filter === "done") return task.done;
    return true;
  });

  // 5. Отрисовка (Внимание: мы убрали <div className="app">, так как он теперь в App.jsx)
  return (
    <div className="todo-container">
      <h1>📝 Мои задачи</h1>
      
      <div className="filters">
        <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>Все</button>
        <button className={filter === "active" ? "active" : ""} onClick={() => setFilter("active")}>Активные</button>
        <button className={filter === "done" ? "active" : ""} onClick={() => setFilter("done")}>Выполненные</button>
      </div>

      <div className="input-row">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Что нужно сделать?"
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask}>Добавить</button>
      </div>
    <div key={filter} className="task-list">
      <ul>
        {filteredTasks.map(task => (
          <li key={task.id} className={task.done ? "done" : ""}>
            <div className="task-content">
              <div className={`custom-checkbox ${task.done ? 'checked' : ''}`
              }
                    onClick={() => toggleTask(task.id)}>
                        {task.done ? <FaCheckSquare /> : <FaRegSquare />}
               </div>
              <span>{task.text}</span>
            </div>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}> <FaTrash /> </button>
          </li>
        ))}
      </ul>
    </div>

      {filteredTasks.length === 0 && <p className="empty">Пока пусто...</p>}
    </div>
  );
}

export default Todo;