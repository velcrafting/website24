import React from 'react';
import SignInForm from '../../components/Forms/SignInForm';
import { Container } from '@mui/material';

const SignIn = () => {
  return (
    <Container maxWidth="sm">
      <SignInForm />
    </Container>
  );
};

export default SignIn;
