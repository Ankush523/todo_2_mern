import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
function App() {
  const [todos, setTodos] = useState([]);
  const [popupactive, setPopupactive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    GetTodos();
  }, []);

  const GetTodos = () => {
    fetch(APIbase + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("error: ", err));
  };
  return <div className="App"></div>;
}

export default App;
