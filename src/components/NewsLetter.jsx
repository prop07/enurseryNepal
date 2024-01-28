import { IoMdSend } from 'react-icons/io';

const NewsLetter = () => {
  return (
    <div className="grid md:mx-12 md:rounded-md justify-items-center text-center  p-10 align-items-center bg-neutral-700 text-slate-100">
      <div className="mb-4">
        <h1 className="font-semi-bold  md:font-bold">Keep me updated about product and offers from the Store.</h1>
      </div>
      <form  className="flex justify-items-center ">
        <input 
        type="email"
          className=" text-sm text-center md:text-base h-10 md:h-12 w-auto px-8 rounded text-neutral-900 "
          placeholder=" Enter Your Email Here!"
          required={true}
        />
        <button  className="ml-2 transition duration-300 ease-in-out hover:scale-125 "><IoMdSend size={35}/></button>
      </form>
    </div>
  );
};

export default NewsLetter;
