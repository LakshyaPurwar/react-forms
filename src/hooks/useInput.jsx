import React, { useState } from 'react'

const useInput = (isValid) => {

    const [inputValue, setInputValue] = useState('');
    const [inputFieldTouched, setInputFieldIsTouched] = useState(false);
    const  inputValueIsValid = isValid(inputValue);
    const  isError = !inputValueIsValid && inputFieldTouched;

    const inputValueChangeHandler = (event) => {
        setInputValue(event.target.value);
    }

    const inputFieldBlurHandler = () => {
        //Blur means it lost focus
        setInputFieldIsTouched(true);
    }

    const reset = ()=>{
        setInputValue('');
        setInputFieldIsTouched(false);
    }

    return {
        inputValue ,
        inputValueIsValid,
        isError,
        inputValueChangeHandler,
        inputFieldBlurHandler,
        reset,
    };
}

export default useInput