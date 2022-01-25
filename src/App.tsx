import { useEffect, useRef, useState } from 'react';

type Todo = {
  value: string;
};

function App() {
  const [text, setText] = useState('');
  const inputEl = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleOnSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      value: text,
    };

    setTodos([newTodo, ...todos]);
    setText('');
    if (inputEl && inputEl.current) {
      inputEl.current.focus();
    }
  };

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
          onChange={(e) => setText(e.target.value)}
        />
        <input type="submit" value="add" onSubmit={handleOnSubmit} />
      </form>
      {todos?.map((todo, index) => {
        return (
          <p key={todo.value}>
            {index} {todo.value}
          </p>
        );
      })}
    </div>
  );
}

export default App;
