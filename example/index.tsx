import * as React from 'react';
import { createRoot } from 'react-dom/client';
import SignUpForm from './SignupForm';

const App = () => {
  return (
    <main
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <SignUpForm />
    </main>
  );
};
const root = createRoot(document.getElementById('root')!);
root.render(<App />);
