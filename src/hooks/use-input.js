import { useState } from 'react';

const useInput = () => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueChangeHandler = event => {
    setEnteredValue(event.target.value);
  };

  const canSubmit = isTouched && enteredValue.length > 2;

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
  };

  return {
    value: enteredValue,
    canSubmit,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  }
};

export default useInput;
