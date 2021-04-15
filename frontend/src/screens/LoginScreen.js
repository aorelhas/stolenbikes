import React from 'react';
// import { Button } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
import GoogleLogin from 'react-google-login';
// import { FacebookLogin } from 'react-facebook-login';
import env from 'react-dotenv';
// import { login } from '../actions/userActions';

const LoginScreen = () => {
  const googleSuccess = async (res) => {
    const result = res?.profileObj;

    const token = res?.tokenId;
    localStorage.setItem('userInfo', JSON.stringify({ result, token }));
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
        isSignedIn={true}
      />
    </>
  );
};

export default LoginScreen;
