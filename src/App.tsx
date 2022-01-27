import { ChangeEvent, useRef, useReducer } from 'react';
import { initialState } from './initialState';
import { reducer } from './reducer';

type Todo = {
  value: string;
  readonly id: number;
  checked: boolean;
  removed: boolean;
};

type Filter = 'all' | 'checked' | 'unchecked' | 'removed';

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
    dispatch({ type: 'filter', filter: e.target.value as Filter });
  };

  const filteredTodos = state.todos.filter((todo) => {
    switch (state.filter) {
      case 'all':
        return !todo.removed;
      case 'checked':
        return todo.checked && !todo.removed;
      case 'unchecked':
        return !todo.checked && !todo.removed;
      case 'removed':
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
        <option value="removed">ゴミ箱</option>
      </select>
      {state.filter === 'removed' ? (
        <button
          onClick={handleOnEmpty}
          disabled={state.todos.filter((todo) => todo.removed).length === 0}
        >
          ゴミ箱を空にする
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
      <ul>
        {filteredTodos?.map((todo) => {
          return (
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
                {todo.removed ? '復元' : '削除'}
              </button>{' '}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
