import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa"
import {
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate, Link } from "react-router-dom";
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
                            className="flex flex-col gap-4 border-b border-[#002D74] py-4 text-[#002D74]"
                        >
                            <input
                                className="p-2 mt-8 rounded-xl border"
                                {...register("email", { required: "Email required !" })}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Email"
                            />
                            <p className="text-sm text-red-500">{errors.email?.message}</p>
                            <div className="relative">
                                <span className="flex items-center gap-2"> <input
                                    className="p-2 rounded-xl border w-full"
                                    {...register("password", { required: "Password required !", minLength: { value: 8, message: "Password min length is 8 !" } })}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                />
                                    {showPassword ? <FaEyeSlash className="cursor-pointer hover:text-cyan-600 " size={25} onClick={handleTogglePassword} /> : <FaEye className="cursor-pointer hover:text-cyan-600 " size={25} onClick={handleTogglePassword} />}   </span>
                                <p className="mt-4 text-sm text-red-500">{errors.password?.message}</p>
                            </div>
                            <button
                                className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
                                type="submit"
                            >Register</button>
                        </form>
                        <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                            <p>Have an account?</p>
                            <Link to={"/login"}>
                                <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
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
