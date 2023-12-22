"use client";
import React, { useState, useEffect } from 'react';
import SelectDate from '@/components/SelectDate';
import { isSameDay, isBefore } from "date-fns";

interface Errors {
    arrivalInput: string | null;
    departInput: string | null;
    return: string | null;
}

export default function PlanForm() {
  const [departInput, setDepartInput] = useState<string>('')
  const [arrivalInput, setArrivalInput] = useState<string>('')
  const [departDate, setDepartDate] = useState<Date | null>(null)
  const [returnDate, setReturnDate] = useState<Date | null>(null)
  const [errors, setErrors] = useState<Errors>({
    arrivalInput: null,
    departInput: null,
    return: null,
  })

  // ** Check functions ** //
  const checkAirportCodeLengths = () => {
    // Ensure that airport code lengths are 3 letters long
    if (departInput.length !== 3) {
      setErrors((prevErrors) => ({ ...prevErrors, departInput: "Departure code must be 3 letters long."}));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, departInput: null}));    
    }
  
    if (arrivalInput.length !== 3) {
      setErrors((prevErrors) => ({ ...prevErrors, arrivalInput: "Arrival code must be 3 letters long."}));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, arrivalInput: null}));    
    }
  }

  const checkDepartBeforeReturn = () => {
    if (departDate && returnDate) {
        if (isSameDay(departDate, returnDate) || isBefore(departDate, returnDate)) {
            // return is either the same day or after departure, which is OK
            setErrors((prevErrors) => ({ ...prevErrors, return: null}));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, return: "Your return date cannot be before your departure date."}));
        }
    }
  }
  
  const areThereErrors = () => {
    const hasErrors = Object.values(errors).some(value => value !== null);
    if (hasErrors) {
        // There are errors
        return true
    } else {
        // No errors, proceed
        return false
    }
  }

  // ** Handler functions ** //
  const handleDepartInput:React.ChangeEventHandler<HTMLInputElement> = (e) => {
    // Test if the input value is an alphabet letter only
    const isAlphabetLetter = /^[A-Za-z]+$/.test(e.target.value);
    // Limit the input length to 3 characters
    const truncatedValue = e.target.value.slice(0, 3);
    // If the truncated value is an alphabet letter or empty, update state
    if (isAlphabetLetter || truncatedValue === '') {
        setDepartInput(truncatedValue.toUpperCase());
    }
  }

  const handleArrivalInput:React.ChangeEventHandler<HTMLInputElement> = (e) => {
    // Test if the input value is an alphabet letter only
    const isAlphabetLetter = /^[A-Za-z]+$/.test(e.target.value);
    // Limit the input length to 3 characters
    const truncatedValue = e.target.value.slice(0, 3);
    // If the truncated value is an alphabet letter or empty, update state
    if (isAlphabetLetter || truncatedValue === '') {
        setArrivalInput(truncatedValue.toUpperCase());
    }
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkAirportCodeLengths();
    checkDepartBeforeReturn();
    if (areThereErrors()) return;
    console.log("No errors, submitting");
  }

  useEffect(() => {
    console.log("departInput is ", departInput)
  }, [departInput])
  useEffect(() => {
    console.log("arrivalInput is ", arrivalInput)
  }, [arrivalInput])

  return (
    <form className="relative flex flex-col gap-4 justify-start items-center" method="POST" action="/form" onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center gap-2">
          <label htmlFor="name">Give your trip a name!</label>
          <input type="text" name="name" placeholder="My Dream Destination" required/>
          {/* {(errors.name) && <p className="text-red">{errors.name}</p>}  */}
        </div>
        
        <div className="flex flex-col justify-center items-center gap-2">
          <label htmlFor="departure">Where are you departing from?</label>
          <input 
            type="text" 
            name="departure" 
            placeholder="ex: DFW" 
            onChange={handleDepartInput} 
            value={departInput} 
            required
          />
          {(errors.departInput) && <p className="text-red-700">{errors.departInput}</p>} 
        </div>
        
        <div className="flex flex-col justify-center items-center gap-2">
          <label htmlFor="arrival">Where are traveling to?</label>
          <input 
            type="text" 
            name="arrival" 
            placeholder="ex: HNL" 
            onChange={handleArrivalInput} 
            value={arrivalInput} 
            required
          />
          {(errors.arrivalInput) && <p className="text-red-700">{errors.arrivalInput}</p>} 
        </div>

        <div>
          <p>Departure Date:</p>
          <SelectDate passingFunct={setDepartDate}/>
        </div>
        
        <div>
          <p>Return Date:</p>
          <SelectDate passingFunct={setReturnDate} />
        </div>
        {errors.return && <p className="text-red-700">{errors.return}</p>}
        <button type="submit" className="w-fit border border-transparent border-2 rounded-full text-white bg-yellow-700 p-2 hover:bg-yellow-400 hover:text-yellow-700 hover:border-yellow-700">Search</button>
    </form>
  )
}