"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

// {dateToPass, functionToPass}
const SelectDate = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  // useEffect(() => {
  //   console.log("New startDate ", startDate);
  // }, [startDate])

  //   const handlePassingFunct = (someDate) => {
  //     functionToPass(someDate);
  //   }
  
  return (
    <DatePicker 
      selected={startDate} 
      minDate={new Date()} 
      onChange={(date) => setStartDate(date as Date)} 
      className="text-center border-l-4 border-yellow-500 w-full p-2 rounded text-sm outline-none focus:ring-0 bg-white"
    />
  );


  return (
    <DatePicker 
    //   selected={dateToPass} 
    //   onChange={(date) => handlePassingFunct(date)} 
    //   minDate={minimumDate}
    //   maxDate={new Date()}
      className="text-center border-l-4 border-red-600 w-full p-3 rounded text-sm outline-none  focus:ring-0 bg-white"
    />
  );
};

export default SelectDate;