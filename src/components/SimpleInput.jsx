import { useState, useRef, useEffect } from "react";
import useInput from "../hooks/useInput";

const SimpleInput = (props) => {

  const nameIsValid = (name) => {
    return name.trim() != '';
  }
  const {
    inputValue: nameValue,
    inputValueIsValid: nameValueIsValid,
    isError: isErrorInName,
    inputValueChangeHandler: nameValueChangeHandler,
    inputFieldBlurHandler: nameFieldBlurHandler,
    reset: resetName

  } = useInput(nameIsValid);
  //Better , we have a derived state denoting validity of inputName
  const isValidEmail = (email) => {

    if (email == '') {
      return false;
    }
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const {
    inputValue: emailValue,
    inputValueIsValid: emailValueIsValid,
    isError: isErrorInEmail,
    inputValueChangeHandler: emailValueChangeHandler,
    inputFieldBlurHandler: emailFieldBlurHandler,
    reset: resetEmail

  } = useInput(isValidEmail);


  const formIsValid = nameValueIsValid && emailValueIsValid;
  const handleFormSubmission = (event) => {
    //The first thing is to prevent default behaviour
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    resetName();
    resetEmail();
  }

  const nameInputClasses = !isErrorInName ? 'input' : 'input invalid';
  const emailInputClasses = !isErrorInEmail ? 'email' : 'email invalid';

  return (
    <form onSubmit={handleFormSubmission}>
      <div className='form-control'>
        <label htmlFor='name'>Your Name</label>
        <input
          /* ref={nameInputRef}*/
          className={nameInputClasses}
          value={nameValue}
          onChange={nameValueChangeHandler}
          type='text'
          id='name'
          onBlur={nameFieldBlurHandler}
        />
        {isErrorInName && <p style={{ color: 'red' }}>* Name must not be empty</p>}

        {/* The email input field will be applied here */}
        <label htmlFor='email'>Email Id : </label>
        <input
          className={emailInputClasses}
          value={emailValue}
          onChange={emailValueChangeHandler}
          type='email'
          id='email'
          onBlur={emailFieldBlurHandler}
        />
        {isErrorInEmail && <p style={{ color: 'red' }}>*Not a valid email</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
