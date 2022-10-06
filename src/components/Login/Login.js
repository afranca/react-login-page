import React, { useState, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const emailReducerFunction = (state, action) => {
  if (action.type === 'USER_INPUT'){
    return {value: action.val, isValid: action.val.includes('@')};
  }
  if (action.type === 'INPUT_BLUR'){
    return {value: state.value, isValid: state.value.includes('@')};
  }  
  return {value: '', isValid: false };
};

const passwordReducerFunction = (state, action) => {
  if (action.type === 'USER_INPUT'){
    return {value: action.val, isValid: action.val.trim().length > 6};
  }
  if (action.type === 'INPUT_BLUR'){
    return {value: state.value, isValid: state.value.trim().length > 6};
  }  
  return {value: '', isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  const [emailState, dispatchEmail] = useReducer(emailReducerFunction, {value: '', isValid: null});
  //const [enteredPassword, setEnteredPassword] = useState('');
  //const [passwordIsValid, setPasswordIsValid] = useState();
  const [passwordState, dispatchPassword] = useReducer(passwordReducerFunction, {value: '', isValid: null});
  const [formIsValid, setFormIsValid] = useState(false);

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  /*
  useEffect(() => {
    const timeoutHandler = setTimeout(()=>{
      console.log('checking validity');
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6
      ); 
    }, 500);

    return () => {
      console.log('Timeout Clean up')
      clearTimeout(timeoutHandler);
    };   

  },[enteredEmail,enteredPassword]);
*/

  const emailChangeHandler = (event) => {
    // This calls emailReducerFunction with the 'action' parameter
    // The state parameter seems to be passed in automatically
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});

    setFormIsValid(
       event.target.value.includes('@') && passwordState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    // This calls passwordReducerFunction with the 'action' parameter
    // The state parameter seems to be passed in automatically    
    dispatchPassword({type: 'USER_INPUT', val: event.target.value});

    setFormIsValid(       
       event.target.value.trim().length > 6 && emailState.isValid
    );

  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'});
    
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid){
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailState.isValid){
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
    
        <Input type='email' 
        ref={emailInputRef}
        id='email' 
        label='E-Mail' 
        value={emailReducerFunction.val}
        onBlur={emailChangeHandler}  
        onChange={validateEmailHandler} 
        isValid={emailState.isValid}
        />
        <Input type='password' 
        ref={passwordInputRef}
        id='password' 
        label='Password' 
        value={passwordChangeHandler.val}
        onBlur={passwordChangeHandler}  
        onChange={validatePasswordHandler} 
        isValid={passwordState.isValid}
        />
        
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
