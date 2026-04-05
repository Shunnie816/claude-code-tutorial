import { useState } from 'react'
import './App.css'

let nextId = 1

export default function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  function addTodo() {
    const text = input.trim()
    if (!text) return
    setTodos([...todos, { id: nextId++, text, completed: false }])
    setInput('')
  }

  function toggleTodo(id) {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') addTodo()
  }

  return (
    <div className="container">
      <h1>Todo App</h1>

      <div className="input-row">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="タスクを入力..."
        />
        <button onClick={addTodo}>追加</button>
      </div>

      {todos.length === 0 ? (
        <p className="empty">タスクがありません</p>
      ) : (
        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span className="todo-text">{todo.text}</span>
              <button
                className="delete-btn"
                onClick={() => deleteTodo(todo.id)}
                aria-label="削除"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="count">
        {todos.filter(t => !t.completed).length} / {todos.length} 件未完了
      </p>
    </div>
  )
}
