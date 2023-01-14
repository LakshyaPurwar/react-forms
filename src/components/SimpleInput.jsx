import { useState, useRef, useEffect } from "react";

const SimpleInput = (props) => {

  const [inputName , setInputName ] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  // const [enteredNameIsValid , setEnteredNameIsValid] = useState(false);
  const [enteredNameTouched , setEnteredNameTouched] = useState(false); 
  const [enteredEmailTouched , setEnteredEmailTouched] = useState(false);
  
  //Better , we have a derived state denoting validity of inputName
  const isValidEmail = (email) => {

    if(email == '')
    {
      return false;
    }
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };


  const enteredNameIsValid = inputName.trim()!=='';
  const enteredEmailIsValid = isValidEmail(inputEmail);
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;
  const formIsValid = enteredNameIsValid && enteredEmailIsValid;


  const handleInputNameChange = (event)=>{
    setInputName(event.target.value);
  }
  
  const handleInputEmailChange = (event)=>{
    setInputEmail(event.target.value);
  }


  const handleInputBlur = ()=>{
    //Blur means it lost focus
    setEnteredNameTouched(true);
  }

  const handleEmailInputBlur = ()=>{
    setEnteredEmailTouched(true);
  }
  
  const handleFormSubmission = (event)=>{
    //The first thing is to prevent default behaviour
    event.preventDefault();
    if(!enteredNameIsValid)
    {
      return;
    }
    setInputName('');
    setEnteredNameTouched(false);
    setInputEmail('');
    setEnteredEmailTouched(false);
    console.log(inputName);
  }

  //2.The other way is to use useRef
  // const nameInputRef = useRef('');
  // const handleFormSubmission = (event)=>{
  //   event.preventDefault();
  //   console.log(nameInputRef.current.value);
  //   //We can reset the input field using ref here
  //   //But that is not the ideal way
  //   //As it tends to directly change the dom
  //   //Not something that should be done with react
  //   nameInputRef.current.value = '';

  // }
  const nameInputClasses = !nameInputIsInvalid ? 'input' : 'input invalid';
  const emailInputClasses = !emailInputIsInvalid?'email': 'email invalid';
  
  return (
    <form onSubmit={handleFormSubmission}>
      <div className='form-control'>
        <label htmlFor='name'>Your Name</label>
        <input
         /* ref={nameInputRef}*/
         className={nameInputClasses}
         value={inputName}
         onChange={handleInputNameChange}
         type='text'
         id='name'
         onBlur={handleInputBlur}
         />
        { nameInputIsInvalid && <p style={{color:'red'}}>* Name must not be empty</p>}

        {/* The email input field will be applied here */}
        <label htmlFor='email'>Email Id : </label>
        <input
         /* ref={nameInputRef}*/
         className={emailInputClasses}
         value={inputEmail}
         onChange={handleInputEmailChange}
         type='text'
         id='email'
         onBlur={handleEmailInputBlur}
         />
        { emailInputIsInvalid && <p style={{color:'red'}}>*Not a valid email</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
