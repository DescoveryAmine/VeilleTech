import React from 'react';
import { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import Card from '../../components/Card/Card';
import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import LoadingSpinner from '../../components/Loading/Loading';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../utils/validators';
import { useHttpClient } from '../../hooks/http-hook';
import { AuthContext } from '../../context/auth-context';
import { useForm } from '../../hooks/form-hook';
import './Auth.css';
import Backdrop from './Backdrop';


const ModalOverlay = props => {

  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );
  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          }
        );
        auth.login(responseData.user.id,responseData.user.name);
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/signup',
          'POST',
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          }
        );

        auth.login(responseData.user.id,responseData.user.name);
        setIsLoginMode(true);
      } catch (err) {}
    }
  };

  const content = (
    <div className={`modal__main ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{isLoginMode ? 'LOGIN HERE' : 'SIGNUP HERE'}</h2>
      </header>
      <React.Fragment>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      <Card className="authentication">
        {isLoading && <LoadingSpinner/>}
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </Button>
        <hr />
        <form onSubmit={authSubmitHandler}>
          <div className="form-inline">
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
          />
          </div>
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>
      </Card>
      <div>
       {error&&(<p>{error}</p>)}
      </div>
      </React.Fragment>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal'));
};

const AuthModal = props => {
  const auth = useContext(AuthContext);
  return (
    <React.Fragment>
      {!auth.isLoggedIn? props.show?<Backdrop onClick={props.onCancel}/>:props.show:props.onCancel}
      <CSSTransition
        in={props.show?!auth.isLoggedIn:props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal__main"
      >
      <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default AuthModal;
