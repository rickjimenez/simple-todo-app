import React, { FC, useState } from 'react';

interface AddTodoForm {
  addTodo: (text: string) => void;
}

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

export default NewTodo;
