"use client";
import React from 'react';
import SelectDate from '@/components/SelectDate';

function page() {
  const handleSubmit = async () => {
    console.log("")
  }

  return (
    <main className="flex relative h-screen flex-col items-center justify-start p-24">
      <h1>Your adventure awaits...</h1>
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
          <SelectDate />
        </div>
        
        <div>
          <p>Return Date:</p>
          <SelectDate />
        </div>
        
        <button type="submit" className="w-fit border border-transparent border-2 rounded-full text-white bg-yellow-700 p-2 hover:bg-yellow-400 hover:text-yellow-700 hover:border-yellow-700">Search</button>
        {/* {(sentResult === true || sentResult === false) ? null : <button type="submit" className={`w-fit p-2 bg-purple-200 border border-white border-4 rounded-full hover:bg-white hover:border-purple-400 hover:text-purple-400 transition ease-in-out`}>Send Message</button>} */}
        {/* {sentResult === true && <button type="button" className={`w-fit p-2 flex justify-center items-center gap-1 border bg-purple-200 border-white border-4 rounded-full`}><FaRegCheckCircle /> Sent!</button>}
        {sentResult === false && <button type="button" className={`w-fit p-2 flex justify-center items-center gap-1 border bg-purple-200 border-white border-4 rounded-full`}><MdErrorOutline /> Oops! Something went wrong.</button>} */}
      </form>
    </main>
  )
}

export default page