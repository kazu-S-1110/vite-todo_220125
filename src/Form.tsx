import { Dispatch, memo, useContext, useRef } from 'react';
import { AppContext } from './AppContext';

export const Form = memo(() => {
  const { state, dispatch } = useContext(AppContext);
  const inputEl = useRef<HTMLInputElement>(null);
  const handleOnSubmit = () => {
    dispatch({ type: 'submit' });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'change', text: e.target.value });
  };

  return (
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
        disabled={state.filter === 'checked'}
        value={state.text}
        onChange={handleOnChange}
      />
      <input
        type="submit"
        disabled={state.filter === 'checked'}
        value="追加"
        onSubmit={handleOnSubmit}
      />
    </form>
  );
});

Form.displayName = 'Form';
