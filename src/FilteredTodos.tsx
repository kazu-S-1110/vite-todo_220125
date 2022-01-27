import { Dispatch, memo } from 'react';
type Props = {
  state: State;
  dispatch: Dispatch<Action>;
};

export const FilteredTodos = memo((props: Props) => {
  const handleOnEdit = (id: number, value: string) => {
    props.dispatch({ type: 'edit', id, value });
  };

  const handleOnCheck = (id: number, checked: boolean) => {
    props.dispatch({ type: 'check', id, checked });
  };

  const handleOnRemove = (id: number, removed: boolean) => {
    props.dispatch({ type: 'remove', id, removed });
  };

  const filteredTodos = props.state.todos.filter((todo) => {
    switch (props.state.filter) {
      case 'all':
        return !todo.removed;
      case 'checked':
        return !todo.removed && todo.checked;
      case 'unchecked':
        return !todo.removed && !todo.checked;
      case 'removed':
        return todo.removed;
      default:
        return todo;
    }
  });

  return (
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
  );
});

FilteredTodos.displayName = 'FilteredTodos';
