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

    setTodos([...todos, newTodo]);
    setText('');
    if (inputEl && inputEl.current) {
      inputEl.current.focus();
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const handleOnEdit = (id: number, value: string) => {
    // ディープコピーしてメモリ空間を確保。元の配列のイミュータビリティを確保
    const deepCopy = todos.map((todo) => ({ ...todo }));
    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.value = value;
      }
      return todo;
    });

    // todos ステート配列をチェック（あとでコメントアウト）
    console.log('=== Original todos ===');
    todos.map((todo) => console.log(`id: ${todo.id}, value: ${todo.value}`));

    setTodos(newTodos);
  };

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
            {index + 1}{' '}
            <input
              type="text"
              value={todo.value}
              onChange={(e) => handleOnEdit(todo.id, e.target.value)}
            />
          </li>
        );
      })}
    </div>
  );
}

export default App;
