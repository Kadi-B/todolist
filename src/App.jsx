import { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Load todos from localStorage when the component mounts
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEditTodo = (id) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    if (todoToEdit) {
      setEditingId(id);
      setInputValue(todoToEdit.text);
    }
  };

  const handleUpdateTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos(todos.map(todo => 
        todo.id === editingId ? { ...todo, text: inputValue } : todo
      ));
      setEditingId(null);
      setInputValue('');
    }
  };

  return (
    <div className='todo'>
      <h1 style={{ textAlign: 'center' }}>Simple Todo List</h1>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={editingId ? "Edit todo" : "Enter a new todo"}
          style={{ flex: 1, padding: '5px' }}
        />
        <button 
          onClick={editingId ? handleUpdateTodo : handleAddTodo} 
          style={{ marginLeft: '5px', padding: '5px 10px' }}
        >
          {editingId ? 'Update' : 'Add'}
        </button>
      </div>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
            />
            <span style={{ 
              marginLeft: '5px', 
              textDecoration: todo.completed ? 'line-through' : 'none',
              flex: 1
            }}>
              {todo.text}
            </span>
            <button onClick={() => handleEditTodo(todo.id)} style={{ marginLeft: '5px' }}>
              Edit
            </button>
            <button onClick={() => handleDeleteTodo(todo.id)} style={{ marginLeft: '5px' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;