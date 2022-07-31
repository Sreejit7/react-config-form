import * as React from 'react';
import {
  FormBuilder,
  FormInputConfig,
  FormSubmitState,
  SubmitButton,
} from '../dist';
import '../dist/react-config-form.cjs.development.css';

interface Props {
  onSignUp?: (form: FormSubmitState) => {};
}

const SignUpForm = ({ onSignUp }: Props) => {
  const signupFormConfig: FormInputConfig[] = [
    {
      label: 'Username',
      initialValue: '',
      type: 'text',
      required: true,
    },
    {
      label: 'Password',
      initialValue: '',
      type: 'password',
      required: true,
    },
    {
      label: 'Remember Me',
      initialValue: false,
      type: 'checkbox',
    },
  ];

  const handleSignupFormSubmit = (form: FormSubmitState) => {
    if (typeof onSignUp === 'function') {
      onSignUp(form);
    } else {
      console.log(form);
    }
  };

  return (
    <main className="page center">
      <FormBuilder
        config={signupFormConfig}
        formStyles={{
          backgroundColor: '#4cd8d3',
          boxShadow: 'none',
          borderColor: '#1e014a',
          borderWidth: '2px',
        }}
        formHeader={
          <header
            style={{
              width: '100%',
            }}
            className="center"
          >
            <h1>Sign Up Form</h1>
          </header>
        }
        onSubmit={handleSignupFormSubmit}
      >
        <SubmitButton text="Sign Up" />
      </FormBuilder>
    </main>
  );
};

export default SignUpForm;
