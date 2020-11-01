import { useState } from 'react';

interface ITodo {
  text: string;
  isCompleted: boolean;
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
    setTodos((prev) =>
      prev.map((el, i) =>
        i === index ? { ...el, isCompleted: !el.isCompleted } : el
      )
    );
  };

  const removeTodo = (index: number) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  return { todos, addTodo, completeTodo, removeTodo };
};

export default useTodos;
