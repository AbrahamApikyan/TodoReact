import { useState, useEffect } from "react";
import "../App.css";
import { Checkbox, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // Make sure to import DeleteIcon for the delete button

function Todo() {
  const [inputValue, setInputValue] = useState("");

  // Retrieve todos from localStorage, or use default todos if none are stored
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos
      ? JSON.parse(savedTodos)
      : [
          { id: 1, name: "buy milk", isCompleted: false },
          { id: 2, name: "buy bread", isCompleted: false },
          { id: 3, name: "buy eggs", isCompleted: false },
        ];
  });

  // Add new todo
  const addTodo = () => {
    if (inputValue.trim() === "") return; // Prevent empty todos

    const newTodo = {
      id: todos.length + 1,
      name: inputValue,
      isCompleted: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue(""); // Clear input after adding todo
  };

  // Handle pressing Enter to add a new todo
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  // Delete todo by ID
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Toggle completion status of todo
  const toggleCompletion = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  // Save todos to localStorage whenever the todos array changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todo">
      <div className="inputBlock">
        <input
          className="inp"
          type="text"
          placeholder="Enter To do..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress} // Listen for Enter key
        />
        <button className="add" onClick={addTodo}>
          Add
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.isCompleted ? "line-through" : "none",
            }}
          >
            <input
            type="checkbox"
            className="checkbox"
              checked={todo.isCompleted}
              onChange={() => toggleCompletion(todo.id)}
            />
            <span className="span">{todo.name}</span>
            <button
            className="delete"
              variant="outlined"
              onClick={() => deleteTodo(todo.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
