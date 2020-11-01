import React, { FC, useState } from 'react';
import './app.scss';

interface ITodo {
  text: string;
  isCompleted: boolean;
}

interface TodoComponent {
  todo: ITodo;
  index: number;
  completeTodo: (index: number) => void;
  removeTodo: (index: number) => void;
}

interface AddTodoForm {
  addTodo: (text: string) => void;
}

const useTodos = () => {
  const [todos, setTodos] = useState<ITodo[]>([
    {
      text: 'Todo 1',
      isCompleted: false,
    },
    {
      text: 'Todo 2',
      isCompleted: false,
    },
    {
      text: 'Todo 3',
      isCompleted: false,
    },
  ]);

  const addTodo = (text: string) => {
    setTodos((prev) => [{ text, isCompleted: false }, ...prev]);
  };

  const completeTodo = (index: number) => {
    setTodos((prev) => prev.map((el, i) => (i === index ? { ...el, isCompleted: !el.isCompleted } : el)));
  };

  const removeTodo = (index: number) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  return { todos, addTodo, completeTodo, removeTodo };
};

export const NewTodo: FC<AddTodoForm> = ({ addTodo }): JSX.Element => {
  const [textValue, setTextValue] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!textValue) return;
    addTodo(textValue);
    setTextValue('');
  };

  return (
    <form className="add-todo" onSubmit={handleSubmit}>
      <input type="text" placeholder="Add new task" value={textValue} onChange={(e) => setTextValue(e.target.value)} />
    </form>
  );
};

export const Todo: FC<TodoComponent> = ({ todo, index, completeTodo, removeTodo }): JSX.Element => {
  return (
    <li className="todo">
      <div className="text">
        {todo.isCompleted ? '✅' : ''}
        {todo.text}
      </div>

      <div className="actions">
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>Delete</button>
      </div>
    </li>
  );
};

const App: FC = (): JSX.Element => {
  const { todos, addTodo, completeTodo, removeTodo } = useTodos();

  return (
    <div className="app">
      <div className="container">
        <h1>To Do's</h1>
        <NewTodo addTodo={addTodo} />
        <ul>
          {todos.map((todo, i) => (
            <Todo key={i} todo={todo} index={i} completeTodo={completeTodo} removeTodo={removeTodo} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
