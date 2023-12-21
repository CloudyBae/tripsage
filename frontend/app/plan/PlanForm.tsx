"use client";
import React, { useState, useEffect } from 'react';
import SelectDate from '@/components/SelectDate';
import { isSameDay, isBefore } from "date-fns";

interface Errors {
    return: string | null;
}

export default function PlanForm() {
  const [departDate, setDepartDate] = useState<Date | null>(null)
  const [returnDate, setReturnDate] = useState<Date | null>(null)
  const [errors, setErrors] = useState<Errors>({return: null})

  useEffect(() => {
    console.log("departDate is now: ", departDate)
    console.log("returnDate is now: ", returnDate)
    if (departDate && returnDate) {
        console.log("Is same day:", isSameDay(departDate, returnDate));
        console.log("Is before:", isBefore(departDate, returnDate));
    }
  }, [departDate, returnDate])

  const checkDepartBeforeReturn = () => {
    if (departDate && returnDate) {
        if (isSameDay(departDate, returnDate) || isBefore(departDate, returnDate)) {
            // return is either the same day or after departure
        } else {
            const obj = {return: "Your return date cannot be before your departure date."}
            setErrors(obj);
        }
    }
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkDepartBeforeReturn();
  }

  return (
    <form className="relative flex flex-col gap-4 justify-start items-center" method="POST" action="/form" onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center gap-2">
          <label htmlFor="name">Give your trip a name!</label>
          <input type="text" name="name" placeholder="My Dream Destination" required/>
          {/* {(errors.name) && <p className="text-red">{errors.name}</p>}  */}
        </div>
        
        <div className="flex flex-col justify-center items-center gap-2">
          <label htmlFor="departure">Where are you departing from?</label>
          <input type="text" name="departure" placeholder="ex: DFW" required/>
          {/* {(errors.email) && <p className="text-red">{errors.email}</p>}  */}
        </div>
        
        <div className="flex flex-col justify-center items-center gap-2">
          <label htmlFor="arrival">Where are traveling to?</label>
          <input type="text" name="arrival" placeholder="ex: HNL" required/>
          {/* {(errors.email) && <p className="text-red">{errors.email}</p>}  */}
        </div>

        <div>
          <p>Departure Date:</p>
          <SelectDate passingFunct={setDepartDate}/>
        </div>
        
        <div>
          <p>Return Date:</p>
          <SelectDate passingFunct={setReturnDate} />
        </div>
        {errors.return && <p className="text-red">{errors.return}</p>}
        <button type="submit" className="w-fit border border-transparent border-2 rounded-full text-white bg-yellow-700 p-2 hover:bg-yellow-400 hover:text-yellow-700 hover:border-yellow-700">Search</button>
    </form>
  )
}