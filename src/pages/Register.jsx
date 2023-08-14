import { useState } from "react";
import {FaEyeSlash,FaEye} from "react-icons/fa"
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

let rendercount = 0;



const Register = () => {
    rendercount++;

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    console.log(errors)
    const redirect = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // console.log(auth?.currentUser?.email);
    // console.log(auth?.currentUser?.photoURL);

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const sinIn = async () => {
        try {
            console.log(email + password);
            await createUserWithEmailAndPassword(auth, email, password);
            redirect("/login");
        } catch (err) {
            console.log(err);
        }
    };

    const sinInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            redirect("/");
        } catch (err) {
            console.log(err);
        }
    };

    const logout = async () => {
        try {
            console.log(email, password);
            await signOut(auth);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <center>{rendercount}</center>
            <section className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                    <div className="md:w-1/2 px-8 md:px-16">
                        <h2 className="font-bold text-2xl text-[#002D74]">Register</h2>
                        <p className="text-xs mt-4 text-[#002D74]">It’s quick and easy.</p>
                        <form
                            onSubmit={handleSubmit(sinIn)}
                            className="flex flex-col gap-4"
                        >
                            <input
                                className="p-2 mt-8 rounded-xl border"
                                {...register("email", { required: "Email required" })}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Email"
                            />
                            
                                <p className="text-red-500">{errors.email?.message}</p>
                            
                            <div className="relative">
                              <span className="flex items-center gap-2"> <input
                                    className="p-2 rounded-xl border w-full"
                                    {...register("password",{required:"password required",minLength:{value:8, message:"Min length is 8"}})}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                />
                          {showPassword?  <FaEyeSlash className="cursor-pointer hover:text-cyan-600 " size={25} onClick={handleTogglePassword}/>: <FaEye className="cursor-pointer hover:text-cyan-600 " size={25} onClick={handleTogglePassword}/> }   </span> 
                                <p className="text-red-500">{errors.password?.message}</p>

                            </div>
                            <button
                                className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
                                type="submit"
                            >Register</button>
                        </form>
                        <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                            <hr className="border-gray-400" />
                            <p className="text-center text-sm">OR</p>
                            <hr className="border-gray-400" />
                        </div>
                        <button
                            onClick={sinInWithGoogle}
                            className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]"
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
