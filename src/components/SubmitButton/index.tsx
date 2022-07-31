import React from 'react';
import '../FormBuilder/formStyles.css';
import { SubmitButtonProps } from './SubmitButton.types';

const SubmitButton = ({
  position = 'middle',
  text,
  submitClass,
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className={`form-submit ${position} ${submitClass ? submitClass : ''}`}
    >
      {text ? text : 'Submit'}
    </button>
  );
};

export default SubmitButton;
