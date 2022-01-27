import { ChangeEvent } from 'react';
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'change': {
      return { ...state, text: action.text };
    }

    case 'check': {
      const deepCopy = state.todos.map((todo) => ({ ...todo }));

      const newTodos = deepCopy.map((todo) => {
        if (todo.id === action.id) {
          todo.checked = !action.checked;
        }
        return todo;
      });
      return { ...state, todos: newTodos };
    }

    case 'edit': {
      const deepCopy = state.todos.map((todo) => ({ ...todo }));

      const newTodos = deepCopy.map((todo) => {
        if (todo.id === action.id) {
          todo.value = action.value;
        }
        return todo;
      });

      return { ...state, todos: newTodos };
    }

    case 'empty': {
      const newTodos = state.todos.filter((todo) => !todo.removed);
      return { ...state, todos: newTodos };
    }

    case 'filter': {
      return { ...state, filter: action.filter };
    }

    case 'remove': {
      const deepCopy = state.todos.map((todo) => ({ ...todo }));

      const newTodos = deepCopy.map((todo) => {
        if (todo.id === action.id) {
          todo.removed = !action.removed;
        }
        return todo;
      });
      return { ...state, todos: newTodos };
    }

    case 'submit': {
      if (!state.text) return state;

      const newTodo: Todo = {
        value: state.text,
        id: new Date().getTime(),
        checked: false,
        removed: false,
      };
      return { ...state, todos: [newTodo, ...state.todos], text: '' };
    }
    default: {
      return state;
    }
  }
};
