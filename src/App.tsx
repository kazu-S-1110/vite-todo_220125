import { useReducer } from 'react';
import { AppContext } from './AppContext';
import { EmptyButton } from './EmptyButton';
import { FilteredTodos } from './FilteredTodos';
import { Form } from './Form';
import { initialState } from './initialState';
import { reducer } from './reducer';
import { Selector } from './Selector';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div>
        <Selector dispatch={dispatch} />
        {state.filter === 'removed' ? <EmptyButton /> : <Form />}
        <FilteredTodos />
      </div>
    </AppContext.Provider>
  );
}

export default App;
