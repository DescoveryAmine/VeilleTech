import React from 'react';
import { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import Card from '../../components/Card/Card';
import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import LoadingSpinner from '../../components/Loading/Loading';
import {toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../utils/validators';
import { useHttpClient } from '../../hooks/http-hook';
import { AuthContext } from '../../context/auth-context';
import { useForm } from '../../hooks/form-hook';
import { useHistory } from "react-router-dom";
import './Auth.css';
import Backdrop from './Backdrop';


const ModalOverlay = props => {


  let history = useHistory({forceRefresh:true});
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
          name: undefined,
          lastname : undefined,
          numcin : undefined,
          age : undefined,
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
          },
          lastname: {
            value: '',
            isValid: false
          },
          numcin: {
            value: '',
            isValid: false
          },
          age: {
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
        const expirationDate = JSON.parse(Buffer.from(responseData.token.split('.')[1], 'base64').toString()).exp*1000;
        auth.login(responseData.userId, responseData.userName, responseData.userRole, responseData.token , expirationDate);
        history.push("/");
        history.go();
      } catch (err) {
        toast.error(`${err}`);
      }
    } else {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/signup',
          'POST',
          JSON.stringify({
            name: formState.inputs.name.value,
            lastname: formState.inputs.lastname.value,
            numcin: formState.inputs.numcin.value,
            age: formState.inputs.age.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          }
        );
        setIsLoginMode(true);
      } catch (err) {
        toast.error(`${err}`);
      }
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
          {isLoginMode ? 'CREATE AN ACCOUNT' : ' SUITCH TO LOGIN '}
        </Button>
        <hr />
        <form onSubmit={authSubmitHandler}>
          <div className="form-inline">
          {!isLoginMode && (
            <>
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
            <Input
            element="input"
            id="lastname"
            type="text"
            label="Your LastName"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a last name."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="numcin"
            type="text"
            label="Your cin number"
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText="Please enter your cin number."
            onInput={inputHandler}
          />
            <Input
            element="input"
            id="age"
            type="text"
            label="Your age plz"
            validators={[VALIDATOR_MINLENGTH(2)]}
            errorText="Please enter your age."
            onInput={inputHandler}
          />
          </>
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
      </React.Fragment>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal'));
};

const AuthModal = props => {
  const auth = useContext(AuthContext);
  return (
    <React.Fragment>
      <ToastContainer/>
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
