import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

type Todo = {
  value: string;
  readonly id: number;
  checked: boolean;
  removed: boolean;
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
      checked: false,
      removed: false,
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

  const handleOnCheck = (id: number, checked: boolean) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleOnRemove = (id: number, removed: boolean) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.removed = !removed;
      }
      return todo;
    });

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
            <input
              type="checkbox"
              disabled={todo.removed}
              checked={todo.checked}
              onChange={() => handleOnCheck(todo.id, todo.checked)}
            />
            {index + 1}{' '}
            <input
              type="text"
              disabled={todo.checked || todo.removed}
              value={todo.value}
              onChange={(e) => handleOnEdit(todo.id, e.target.value)}
            />
            <button onClick={() => handleOnRemove(todo.id, todo.removed)}>
              {todo.removed ? '復元' : 'アーカイブ'}
            </button>{' '}
          </li>
        );
      })}
    </div>
  );
}

export default App;
