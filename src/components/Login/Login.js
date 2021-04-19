import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/userSlice';
import { auth } from '../../firebase';
import './Login.css'
import { makeStyles } from '@material-ui/core/styles';
import LoginForm from './LoginForm/LoginForm';

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: theme.spacing(2),
  },
  textField: {
    width: '365px',
  },
}));

function Login() {
  const [values, setValues] = useState({
    name: '',
    profilePic: '',
    email: '',
    password: '',
    showPassword: false,
    checkIn: false,
    emailError: '',
    passwordError: '',
    nameError: '',
  });
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value, [prop + 'Error']: '' });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickRegisterNow = () => {
    setValues({ ...values, checkIn: !values.checkIn, email: '', password: '' });
  };
  const loginToApp = e => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(values.email, values.password)
      .then(userAuth => {
        dispatch(login({
          email: userAuth.user.email,
          uid: userAuth.user.uid,
          displayName: userAuth.user.displayName,
          profileUrl: userAuth.user.photoURL,
        }))
      })
      .catch(error => userValidation(error));
  };
  const register = e => {
    e.preventDefault();
    if (!values.name) {
      return setValues({ ...values, nameError: 'Please enter a full name!' });
    }
    auth.createUserWithEmailAndPassword(values.email, values.password)
      .then((userAuth) => {
        console.log(values);
        userAuth.user.updateProfile({
          displayName: values.name,
          photoURL: values.profilePic,
        })
          .then(() => {
            dispatch(login({
              email: userAuth.user.email,
              uid: userAuth.user.uid,
              displayName: values.name,
              photoURL: values.profilePic,
            }))
          })
      })
      .catch(error => userValidation(error));
  };
  const userValidation = error => {
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/invalid-email':
        setValues({ ...values, emailError: error.message })
        break;
      case 'auth/wrong-password':
      case 'auth/weak-password':
        setValues({ ...values, passwordError: error.message })
        break;
      default:
        alert(error);
        break;
    }
  }

  return (
    <div className="login">
      <img src="https://news.hitb.org/sites/default/files/styles/large/public/field/image/500px-LinkedIn_Logo.svg__1.png?itok=q__lR0Vks" alt="Linkedin" />
      <LoginForm
        values={values}
        classes={classes}
        submit={values.checkIn ? register : loginToApp}
        handleChange={handleChange}
        handleClickShowPassword={handleClickShowPassword}
        handleMouseDownPassword={handleMouseDownPassword}
      />
      <p>{values.checkIn ? 'Already have an account?' : 'Not a member?'} {" "}
        <span
          className="login__register"
          onClick={handleClickRegisterNow}
        >{values.checkIn ? 'Sign In With Email' : 'Register Now'}</span>
      </p>
    </div>
  )
}

export default Login
