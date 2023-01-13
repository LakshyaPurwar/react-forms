import { useState, useRef } from "react";

const SimpleInput = (props) => {

  const [inputName , setInputName ] = useState('');
  // const [enteredNameIsValid , setEnteredNameIsValid] = useState(false);
  const [enteredNameTouched , setEnteredNameTouched] = useState(false);
  
  //Better , we have a derived state denoting validity of inputName
  const enteredNameIsValid = inputName.trim()!=='';
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;


  const handleInputChange = (event)=>{
    setInputName(event.target.value);
  }


  const handleInputBlur = ()=>{
    //Blur means it lost focus
    setEnteredNameTouched(true);

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
  const nameInputClasses = !nameInputIsInvalid ? 'form-control' : 'form-control invalid';
  
  return (
    <form onSubmit={handleFormSubmission}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
         /* ref={nameInputRef}*/
         value={inputName}
         onChange={handleInputChange}
         type='text'
         id='name'
         onBlur={handleInputBlur}
         />
        { nameInputIsInvalid && <p style={{color:'red'}}>* Name must not be empty</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
