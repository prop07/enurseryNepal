import React from "react";
// import SendIcon from '@mui/icons-material/Send';
import { IoMdSend } from 'react-icons/io';

const NewsLetter = () => {
  return (
    <div className="grid justify-items-center text-center  p-10 align-items-center bg-neutral-700 text-slate-100">
      <div className="mb-5">
        <h1 className="font-semi-bold  md:font-bold">Keep me updated about product and offers from the Store.</h1>
      </div>
      <div className="flex justify-items-center ">
        <input 
        
        type="email"
          className=" text-sm md:text-base h-10 md:h-12 w-auto px-8 rounded text-neutral-900 "
          placeholder=" Enter Your Email Here!"
        />
        <button className="ml-2"><IoMdSend size={35}/></button>
      </div>
    </div>
  );
};

export default NewsLetter;
