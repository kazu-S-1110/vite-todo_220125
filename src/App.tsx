import { ChangeEvent, useRef, useReducer } from 'react';
import { initialState } from './initialState';
import { reducer } from './reducer';

type Todo = {
  value: string;
  readonly id: number;
  checked: boolean;
  removed: boolean;
};

type Filter = 'all' | 'checked' | 'unchecked' | 'archived';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputEl = useRef<HTMLInputElement>(null);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'change', text: e.target.value });

  const handleOnSubmit = () => {
    dispatch({ type: 'submit' });
  };

  const handleOnEdit = (id: number, value: string) => {
    dispatch({ type: 'edit', id, value });
  };

  const handleOnCheck = (id: number, checked: boolean) => {
    dispatch({ type: 'check', id, checked });
  };

  const handleOnRemove = (id: number, removed: boolean) => {
    dispatch({ type: 'remove', id, removed });
  };

  const handleOnEmpty = () => {
    dispatch({ type: 'empty' });
  };

  const handleOnFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'filter', value: e.target.value as Filter });
  };

  const filteredTodos = state.todos.filter((todo) => {
    switch (state.filter) {
      case 'all':
        return !todo.removed;
      case 'checked':
        return todo.checked && !todo.removed;
      case 'unchecked':
        return !todo.checked && !todo.removed;
      case 'archived':
        return todo.removed;
      default:
        return todo;
    }
  });

  return (
    <div>
      <select
        defaultValue="all"
        // e.target.value: string を Filter 型にキャストする
        onChange={handleOnFilter}
      >
        <option value="all">すべてのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="archived">アーカイブ</option>
      </select>
      {state.filter === 'archived' ? (
        <button
          onClick={handleOnEmpty}
          disabled={state.todos.filter((todo) => todo.removed).length === 0}
        >
          アーカイブ全削除
        </button>
      ) : (
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
            value={state.text}
            disabled={state.filter === 'checked'}
            onChange={(e) => handleOnChange(e)}
          />
          <input
            type="submit"
            disabled={state.filter === 'checked'}
            value="add"
            onSubmit={handleOnSubmit}
          />
        </form>
      )}
      {filteredTodos?.map((todo) => {
        return (
          <ul>
            <li key={todo.id}>
              <input
                type="checkbox"
                disabled={todo.removed}
                checked={todo.checked}
                onChange={() => handleOnCheck(todo.id, todo.checked)}
              />
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
          </ul>
        );
      })}
    </div>
  );
}

export default App;
