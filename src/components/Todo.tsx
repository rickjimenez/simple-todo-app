import React, { FC } from 'react';

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

export default Todo;
