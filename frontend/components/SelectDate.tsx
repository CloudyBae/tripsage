"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Update the type for passingFunct
type SelectDateProps = {
  passingFunct: React.Dispatch<React.SetStateAction<Date | null>>;
};

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const SelectDate: React.FC<SelectDateProps> = ({ passingFunct }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  const handlerFunct = (someDate: Date) => {
    setStartDate(someDate);
    passingFunct(someDate);
  };

  return (
    <DatePicker
      selected={startDate}
      minDate={new Date()}
      onChange={(date) => handlerFunct(date as Date)}
      className="text-center border-l-4 border-yellow-500 w-full p-2 rounded text-sm outline-none focus:ring-0 bg-white"
    />
  );
};

export default SelectDate;