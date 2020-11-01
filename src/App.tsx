import React, { FC } from 'react';
import useTodos from './hooks/useTodos';
import NewTodo from './components/NewTodo';
import Todo from './components/Todo';

import './app.scss';

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
