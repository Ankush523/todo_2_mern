import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

const APIbase = "http://localhost:3001";
function App() {
  const [todos, setTodos] = useState([]);
  const [popupactive, setPopupactive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    GetTodos();
    console.log(todos);
  }, []);

  const GetTodos = () => {
    fetch(APIbase + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("error: ", err));
  };

  const completeTodo = async (id) => {
    const data = await fetch(APIbase + "/todo/complete/" + id).then((res) =>
      res.json()
    );
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }

        return todo;
      })
    );
  };

  const deleteTodo = async (id) => {
    const data = await fetch(APIbase + "/todo/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());
    setTodos((todos) => todos.filter((todo) => todo._id !== data._id));
  };

  const addTodo = async () => {
    const data = await fetch(APIbase + "/todo/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTodo }),
    }).then(res => res.json())

    setTodos([...todos, data]);
    setPopupactive(false);
    setNewTodo("")
    console.log(data);
  };
  return (
    <div className="App">
      <h1>Welcome Ankush</h1>
      <h3>Your Tasks</h3>
      <div>
        {todos.map((todo) => (
          <div
            className={"todo" + (todo.complete ? "is-complete" : "")}
            onClick={() => completeTodo(todo._id)}
            key={todo._id}
          >
            <div className="checkbox"></div>

            <div className="text">{todo.text}</div>

            <div
              className="delete-todo"
              onClick={() => deleteTodo(todo._id)}
              key={todo._id}
            ></div>
          </div>
        ))}
      </div>
      <div className="addPopup" onClick={() => setPopupactive(true)}>
        +
      </div>

      {popupactive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupactive(false)}>
            x
          </div>
          <div className="content">
            <h3>Add Task</h3>
            <input
              type="text"
              className="add-todo-input"
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
            />
            <div className="button" onClick={addTodo}>
              Create Task
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
