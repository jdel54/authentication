import { getSession } from 'next-auth/client';
import { Fragment } from 'react';
import AuthForm from '../components/auth/auth-form';


function AuthPage() {
  return (
    <Fragment>
  <AuthForm />
    </Fragment>
  )
}

export default AuthPage;
