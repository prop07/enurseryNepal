import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
//user
import { useUser } from '../context/UserContext';
import { useEffect } from "react";



const Register = () => {
  const { updateUser, userId } = useUser();
  const redirect = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    userId?redirect("/"): null;
  }, [userId])
  

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const sinIn = async () => {
    setErrorResponse(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      redirect("/")

    } catch (err) {
      setErrorResponse({
        message: err.message,
        code: err.code,
      });
    }
    setLoading(false);
  };

  const sinInWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      updateUser(auth?.currentUser?.id);
      // redirect("/");
    } catch (err) {
      setErrorResponse({
        message: err.message,
        code: err.code,
      });
    }
    setLoading(false);
  };

  
  return (
    <div className="static">
      {loading?    <div className="absolute h-full w-full backdrop-blur-sm bg-white/30 "> <div className="flex h-full items-center justify-center space-x-2">
                  <div className="w-2 h-2 rounded-full animate-pulse bg-neutral-700"></div>
                  <div className="w-2 h-2 rounded-full animate-pulse bg-neutral-700"></div>
                  <div className="w-2 h-2 rounded-full animate-pulse bg-neutral-700"></div>
                </div></div>: null }
      <section className=" bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-2 items-center">
          <div className="md:block hidden w-1/2">
            <img
              className="rounded-2xl"
              src="https://img.freepik.com/free-photo/beautiful-african-woman-smiling-holding-flower-pot-hands-white-wall_176420-12380.jpg?size=626&ext=jpg"
            />
          </div>
          <div className="md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
            <p className="text-xs mt-4 text-[#002D74]">
              If you are already a member, easily log in.
            </p>
            <form
              onSubmit={handleSubmit(sinIn)}
              className="flex flex-col gap-2"
            >
              <input
                className="p-2 mt-8 rounded-xl border"
                {...register("email", {
                  required: "Email required !",
                })}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
              />
              <p className="text-red-500 text-sm pl-4">
                {errors.email?.message}
              </p>
              <div >
                <span className="flex items-center gap-2">
                  <input
                    className="p-2 rounded-xl border w-full"
                    {...register("password", {
                      required: "Password required !",
                    })}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  {showPassword ? (
                    <FaEyeSlash
                      className="cursor-pointer hover:text-cyan-600 "
                      size={25}
                      onClick={handleTogglePassword}
                    />
                  ) : (
                    <FaEye
                      className="cursor-pointer hover:text-cyan-600 "
                      size={25}
                      onClick={handleTogglePassword}
                    />
                  )}{" "}
                </span>
                <p className="mt-2 text-red-500 text-sm pl-4">
                  {errors.password?.message}
                </p>
              </div>
              {errorResponse ? (
                <div
                  className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <svg
                    className="flex-shrink-0 inline w-4 h-4 mr-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <div>
                    <p className="mi-3 text-sm">{errorResponse.message}</p>
                  </div>
                </div>
              ) : null}
              <button
                className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
                type="submit"
              >
                Login
              </button>
            </form>
            <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>
            <button
              onClick={sinInWithGoogle}
              className="bg-white border py-2 w-full rounded-xl mt-2 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]"
            >
              <svg
                className="mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="25px"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              Login with Google
            </button>
            <div className="mt-3 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
              <a href="#">Forgot your password?</a>
            </div>
            <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
              <p>Don&apos;t have an account?</p>
              <Link to={"/register"}>
                <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
