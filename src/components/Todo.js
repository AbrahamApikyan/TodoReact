import { useState, useEffect } from "react";
import "../App.css";
import { Checkbox, Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function Todo() {
  const [inputValue, setInputValue] = useState("");

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

  const addTodo = () => {
    if (inputValue.trim() === "") return;

    const newTodo = {
      id: todos.length + 1,
      name: inputValue,
      isCompleted: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleCompletion = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todo">
      <div className="inputBlock">
        <TextField
          placeholder="Enter To do..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <Button onClick={addTodo} variant="outlined">
          Add
        </Button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.isCompleted ? "line-through" : "none",
            }}
          >
            <Checkbox defaultChecked />

            <span className="span">{todo.name}</span>
            <Button variant="outlined" startIcon={<DeleteIcon />}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
