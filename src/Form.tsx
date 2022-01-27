import { Dispatch, memo, useRef } from 'react';

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
};

export const Form = memo((props: Props) => {
  const inputEl = useRef<HTMLInputElement>(null);
  const handleOnSubmit = () => {
    props.dispatch({ type: 'submit' });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.dispatch({ type: 'change', text: e.target.value });
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
        disabled={props.state.filter === 'checked'}
        value={props.state.text}
        onChange={handleOnChange}
      />
      <input
        type="submit"
        disabled={props.state.filter === 'checked'}
        value="追加"
        onSubmit={handleOnSubmit}
      />
    </form>
  );
});

Form.displayName = 'Form';
