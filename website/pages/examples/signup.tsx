import {
  FormBuilder,
  FormInputConfig,
  SubmitButton,
  FormSubmitState,
} from '../../../dist';
import { StyledPage } from '..';

const SignUpForm = () => {
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
      label: 'Bio',
      initialValue: '',
      type: 'textarea',
    },
    {
      label: 'Gender',
      initialValue: '',
      type: 'radio',
      options: ['Male', 'Female', 'Do not specify'],
    },
    {
      label: 'Upload a profile picture',
      type: 'file',
    },
    {
      label: 'Remember Me',
      initialValue: false,
      type: 'checkbox',
    },
  ];

  const handleSignupFormSubmit = (form: FormSubmitState) => {
    console.log(form);
  };

  return (
    <StyledPage>
      <FormBuilder
        config={signupFormConfig}
        formStyles={{
          backgroundColor: '#4cd8d3',
          border: '1px solid #1e014a',
        }}
        formHeader={
          <header
            style={{
              width: '100%',
            }}
            className="center"
          >
            <h1>Sign Up</h1>
          </header>
        }
        onSubmit={handleSignupFormSubmit}
      >
        <SubmitButton text="Sign Up" />
      </FormBuilder>
    </StyledPage>
  );
};

export default SignUpForm;
