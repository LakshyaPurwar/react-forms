import useInput from "../hooks/useInput";
import isValidEmail from "../validations/isValidEmail";


const BasicForm = (props) => {

  const{
    inputValue : fNameValue,
    inputValueIsValid : fNameIsValid,
    isError : isErrorInFName,
    inputValueChangeHandler : fNameValueChangeHandler,
    inputFieldBlurHandler : fNameFieldBlurHandler,
    reset  : resetFName

  } = useInput((fname)=>{return fname!=''});

  const{
    inputValue : lNameValue,
    inputValueIsValid : lNameIsValid,
    isError : isErrorInLName,
    inputValueChangeHandler : lNameValueChangeHandler,
    inputFieldBlurHandler : lNameFieldBlurHandler,
    reset  : resetLName

  } = useInput((lname)=>{return lname!=''});

  const{
    inputValue : emailValue,
    inputValueIsValid : emailIsValid,
    isError : isErrorInEmail,
    inputValueChangeHandler : emailValueChangeHandler,
    inputFieldBlurHandler : emailFieldBlurHandler,
    reset  : resetEmail,

  } = useInput(isValidEmail);

  const formIsValid = fNameIsValid && lNameIsValid && emailIsValid;

  const formSubmissionHandler = (event)=>{

    event.preventDefault();
    if(!formIsValid)
    {
      return;
    }
    resetLName();
    resetFName();
    resetEmail();

  }

  const fNameClasses = isErrorInFName ? 'fName invalid' : 'fName';
  const lNameClasses = isErrorInLName ? 'lName invalid' : 'lName';
  const emailClasses = isErrorInEmail ? 'email invalid' : 'email';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className='control-group'>
        <div className='form-control'>
          <label htmlFor='fname'>First Name</label>
          <input type='text'
           id='fname'
           className={fNameClasses}
           onChange = {fNameValueChangeHandler}
           onBlur = {fNameFieldBlurHandler}
           value = {fNameValue}
           />
          {isErrorInFName && <p className="error-text">* Name cannot be empty</p>}
        </div>
        <div className='form-control'>
          <label htmlFor='lname'>Last Name</label>
          <input
           type='text'
            id='lname' 
            className={lNameClasses}
            value={lNameValue}
            onChange={lNameValueChangeHandler}
            onBlur = {lNameFieldBlurHandler}
            />
          {isErrorInLName &&<p className="error-text">* Name cannot be empty</p>}
        </div>
      </div>
      <div className='form-control'>
        <label htmlFor='email'>E-Mail Address</label>
        <input
         type='email'
          id='email'
          className={emailClasses}
          value = {emailValue}
          onChange = {emailValueChangeHandler}
          onBlur = {emailFieldBlurHandler}
          />
        {isErrorInEmail && <p className="error-text">*Email is Invalid</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
