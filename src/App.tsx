import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

type Todo = {
  value: string;
  readonly id: number;
};

function App() {
  const [text, setText] = useState('');
  const inputEl = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleOnSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
    };

    setTodos([newTodo, ...todos]);
    setText('');
    if (inputEl && inputEl.current) {
      inputEl.current.focus();
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  useEffect(() => {}, []);

  return (
    <div>
      <form
        onSubmit={(e) => {
          // <form> タグの中でいったん e.preventDefault() しているのは Enter キー打鍵でページそのものがリロードされてしまうのを防ぐため
          e.preventDefault();
          handleOnSubmit();
        }}
      >
        <input
          ref={inputEl}
          type="text"
          value={text}
          onChange={(e) => handleOnChange(e)}
        />
        <input type="submit" value="add" onSubmit={handleOnSubmit} />
      </form>
      {todos?.map((todo, index) => {
        return (
          <li key={todo.id}>
            {index} {todo.value}
          </li>
        );
      })}
    </div>
  );
}

export default App;
