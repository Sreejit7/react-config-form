import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUpForm from '../example/SignupForm';
import { FormSubmitState } from '../src';

describe('FormBuilder component', () => {
  let mockForm: RenderResult;
  let mockFormSubmit = jest.fn<{}, [FormSubmitState]>();

  beforeEach(() => {
    mockForm = render(<SignUpForm onSignUp={mockFormSubmit} />);
  });

  it('should display the form properly', () => {
    const { getByText, getByLabelText } = mockForm;

    // The form header & inputs should be visible
    expect(getByText('Sign Up Form')).toBeVisible();
    // Additional '*' included in labels for required fields
    expect(getByLabelText('Username*')).toBeVisible();
    expect(getByLabelText('Password*')).toBeVisible();
    expect(getByLabelText('Remember Me')).toBeVisible();
    expect(getByText('Sign Up')).toBeVisible();
  });

  it('should update the form properly on input change', () => {
    const { getByLabelText } = mockForm;
    const usernameInput = getByLabelText('Username*');
    const passwordInput = getByLabelText(/password*/i);
    const rememberMeInput = getByLabelText('Remember Me');

    // update form inputs
    fireEvent.change(usernameInput, { target: { value: 'sreejit7' } });
    fireEvent.change(passwordInput, { target: { value: 'sreejit@123' } });
    fireEvent.change(rememberMeInput, { target: { checked: true } });

    expect(usernameInput).toHaveValue('sreejit7');
    expect(passwordInput).toHaveValue('sreejit@123');
    expect(rememberMeInput).toBeChecked();
  });

  it('should handle form submission properly', () => {
    const { getByRole, getByLabelText } = mockForm;

    const usernameInput = getByLabelText('Username*');
    const passwordInput = getByLabelText(/password*/i);
    const rememberMeInput = getByLabelText('Remember Me');
    const submitBtn = getByRole('button');

    // update form inputs
    fireEvent.change(usernameInput, { target: { value: 'sreejit7' } });
    fireEvent.change(passwordInput, { target: { value: 'sreejit@123' } });

    // submit the form
    fireEvent.click(submitBtn);

    expect(mockFormSubmit).toHaveBeenCalledTimes(1);
    expect(mockFormSubmit).toBeCalledWith({
      Username: 'sreejit7',
      Password: 'sreejit@123',
      'Remember Me': false,
    });

    // submission should reset the form
    expect(usernameInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(rememberMeInput).not.toBeChecked();
  });
});
