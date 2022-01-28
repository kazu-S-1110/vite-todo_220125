import { Dispatch, memo, useContext } from 'react';
import { AppContext } from './AppContext';

export const EmptyButton = memo(() => {
  const { state, dispatch } = useContext(AppContext);
  const handleOnEmpty = () => {
    dispatch({ type: 'empty' });
  };

  return <button onClick={handleOnEmpty}>ごみ箱を空にする</button>;
});

EmptyButton.displayName = 'EmptyButton';
