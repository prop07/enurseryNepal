import { useState , useEffect } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

//user
import { useUser } from '../context/UserContext';


const Register = () => {
  const redirect = useNavigate();
  const { userId } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [registerState, setRegisterState] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    userId?setLoading(true): null;
    userId?redirect("/"): null;
  })

  const sinIn = async () => {
    setErrorResponse(null);
    setRegisterState(false);
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setRegisterState(true);
    } catch (err) {
      setErrorResponse({
        message: err.customData._tokenResponse.error.message,
        code: err.customData._tokenResponse.error.code,
      });
    }
    setLoading(false);
  };
  return (
    <div className="static">
      {loading || userId ?   <div className="absolute h-full w-full backdrop-blur-sm bg-white/30 "> <div className="flex h-full items-center justify-center space-x-2">
                  <div className="w-2 h-2 rounded-full animate-pulse bg-neutral-700"></div>
                  <div className="w-2 h-2 rounded-full animate-pulse bg-neutral-700"></div>
                  <div className="w-2 h-2 rounded-full animate-pulse bg-neutral-700"></div>
                </div></div>: null }
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-2 items-center">
          <div className="md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-2xl text-[#002D74]">Register</h2>
            <p className="text-xs mt-4 text-[#002D74]">
              It&apos;s quick and easy.
            </p>
            <form
              onSubmit={handleSubmit(sinIn)}
              className="flex flex-col gap-2"
            >
              <input
              id="email"
                className="p-2 mt-8 rounded-xl border"
                {...register("email", {
                  required: "Email required !",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email format !",
                  },
                })}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
              />
              <p className="text-red-500 text-sm pl-4">
                {errors.email?.message}
              </p>
              <div>
                <span className="flex items-center gap-2">
                  <input
                    className="p-2 rounded-xl border w-full"
                    {...register("password", {
                      required: "Password required !",
                      minLength: { value: 8, message: "Min length is 8 !" },
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
              {registerState ? (
                <div
                  className="flex items-center rounded-lg p-4 mb-4 text-green-800  bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800"
                  role="alert"
                >
                  <svg
                    className="flex-shrink-0 w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <p className="ml-3 text-sm">
                    Account Registered successfully.
                  </p>
                </div>
              ) : null}
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
                    <p className="mi-3 text-sm">{errorResponse.message}.</p>
                    <p className="mi-3 text-sm">
                      {" "}
                      Error-Code:{errorResponse.code}.
                    </p>
                  </div>
                </div>
              ) : null}
              <button
                className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
                type="submit"
              >
                Register
              </button>
            </form>
            <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>
            <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
              <p>Have an account?</p>
              <Link to={"/login"}>
                <button className="py-2 px-4 bg-white border rounded-xl hover:scale-110 duration-300">
                  Log In
                </button>
              </Link>
            </div>
          </div>
          <div className="md:block hidden w-1/2">
            <img
              className="rounded-2xl"
              src="https://img.freepik.com/premium-photo/tropical-plants-banana-pot-white-background-generative-ai_58409-34885.jpg?w=740"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
