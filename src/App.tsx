import { useReducer } from 'react';
import { EmptyButton } from './EmptyButton';
import { FilteredTodos } from './FilteredTodos';
import { Form } from './Form';
import { initialState } from './initialState';
import { reducer } from './reducer';
import { Selector } from './Selector';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <Selector dispatch={dispatch} />
      {state.filter === 'removed' ? (
        <EmptyButton dispatch={dispatch} />
      ) : (
        <Form state={state} dispatch={dispatch} />
      )}
      <FilteredTodos state={state} dispatch={dispatch} />
    </div>
  );
}

export default App;
