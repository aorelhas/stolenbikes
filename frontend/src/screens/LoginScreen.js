import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { Button } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
import GoogleLogin from 'react-google-login';
// import { FacebookLogin } from 'react-facebook-login';
import env from 'react-dotenv';
// import { login } from '../actions/userActions';

const LoginScreen = ({ location, history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const redirect = location.search
    ? location.search.split('=')[1]
    : '/dashboard';

  useEffect(() => {
    if (userInfo) history.push(redirect);
  }, [history, userInfo, redirect]);

  const googleSuccess = async (res) => {
    const result = res?.profileObj;

    const token = res?.tokenId;
    localStorage.setItem('userInfo', JSON.stringify({ result, token }));
    history.push('/dashboard');
  };

  const googleFailure = () => {
    console.log('Google Sign In was unsuccessfull. Try Again.');
  };

  return (
    <>
      <GoogleLogin
        clientId={env.GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy={'single_host_origin'}
        // isSignedIn={true}
      />
    </>
  );
};

export default LoginScreen;
