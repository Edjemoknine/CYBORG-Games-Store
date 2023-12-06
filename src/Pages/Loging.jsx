import React, { useState } from "react";
import { useForm } from "react-hook-form";
import MostPopilair from "../sections/MostPopilair";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import googleIcon from "../images/google.png";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth";
import { auth } from "../utils/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Loging = () => {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const Loginschema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(15),
  });

  const Registerschema = z
    .object({
      name: z.string().min(4),
      email: z.string().email(),
      password: z.string().min(8).max(15),
      confirmPwd: z.string().min(6).max(20),
    })
    .refine((data) => data.password === data.confirmPwd, {
      message: "Password do not match",
      path: ["confirmPwd"],
    });

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isLogged ? Loginschema : Registerschema),
  });
  const HandleSubmit = async (data) => {
    console.log(data);
    if (isLogged) {
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        navigate("/");
      } catch (error) {}
    } else {
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        await updateProfile(user, { displayName: `${data.name}` });
        toast.success("You been Logged successfuly !");
        navigate("/");
      } catch (error) {
        setError(error.message);
      }
    }

    reset();
  };
  const GoogleAuth = async () => {
    const google = new GoogleAuthProvider();
    await signInWithPopup(auth, google);
  };

  return (
    <div className="min-h-[90vh]">
      <MostPopilair
        cards={
          <div className="max-w-xl pb-3 text-center h-full w-full mx-auto">
            <div className="border-gray-500 border-2 dark:border-white rounded-xl pb-6 ">
              <h1 className="text-3xl font-semibold my-3 text-center">
                {isLogged ? "Sign In" : "Register"}
              </h1>
              <form
                onSubmit={handleSubmit(HandleSubmit)}
                className="flex items-center  w-[80%] mx-auto flex-col gap-2"
                action=""
              >
                {!isLogged && (
                  <>
                    <input
                      {...register("name")}
                      placeholder="Username"
                      className="px-4 py-2 rounded-lg outline-none w-full  bg-gray-600 text-white"
                      type="text"
                    />
                    {errors.name && (
                      <span style={{ color: "red", fontSize: "10px" }}>
                        {errors.name.message}
                      </span>
                    )}
                  </>
                )}
                <>
                  <input
                    {...register("email")}
                    placeholder="Email"
                    className="px-4 py-2 rounded-lg outline-none w-full  bg-gray-600 text-white"
                    type="email"
                  />
                  {errors.email && (
                    <span style={{ color: "red", fontSize: "10px" }}>
                      {errors.email.message}
                    </span>
                  )}
                </>
                <>
                  <input
                    {...register("password")}
                    placeholder="Password"
                    className="px-4 py-2 rounded-lg outline-none w-full bg-gray-600 text-white"
                    type="password"
                  />
                  {errors.password && (
                    <span style={{ color: "red", fontSize: "10px" }}>
                      {errors.password.message}
                    </span>
                  )}
                </>{" "}
                {!isLogged && (
                  <>
                    <>
                      <input
                        {...register("confirmPwd")}
                        placeholder="Confirme Password"
                        className="px-4 py-2 rounded-lg outline-none w-full bg-gray-600 text-white"
                        type="password"
                      />
                      {errors.confirmPwd && (
                        <span style={{ color: "red", fontSize: "10px" }}>
                          {errors.confirmPwd.message}
                        </span>
                      )}
                    </>{" "}
                  </>
                )}
                <button
                  className="bg-rose-500 rounded-lg text-white w-fit px-3 py-1"
                  type="submit"
                >
                  {isLogged ? "Sign In" : "Sign Up"}
                </button>
              </form>
              <div className="mt-3 flex flex-col items-center text-gray-400 text-sm">
                <p>
                  {isLogged
                    ? " I dont have an account"
                    : "I already have an account"}
                  <button
                    className="text-red-500 ml-1"
                    onClick={() => setIsLogged((prev) => !prev)}
                  >
                    {isLogged ? " Sign Up" : " Sign In"}
                  </button>
                </p>
                <img
                  onClick={GoogleAuth}
                  src={googleIcon}
                  alt="google"
                  className="w-8 h-8 cursor-pointer object-cover "
                />
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Loging;
