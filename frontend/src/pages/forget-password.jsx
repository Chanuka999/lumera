import axios from "axios";
import React from "react";
import { useState } from "react";

const ForgetPassword = () => {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp,setOtp] = useState("");
  const [newUser,setNewPassword]

  const sendOTP = async() =>{
         try {
            await axios.get(import.meta.VITE_API_URL + "/api/users/send-")
         } catch (error) {
            toast.error("Failed to send op")

         }
  }
  return (
    <div className="w-full h-screen flex justify-center items-center bg-[url('bg.png')] bg-cover bg-center">
      <div className="w-[400px] h-[400px] backdrop-blur-lg rounded-2xl flex flex-col justify-center items-center">
        <h1 className="text-2xl font-semibold text-secondary mb-6">
          Reset Password
        </h1>
        <input
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-3 rounded-lg"
        />
        <button
          className="w-full bg-accent text-white p-3 rounded-lg hover:bg-accent/90 transition"
          onClick={() => setStep("otp")}
        >
          send OTP
        </button>
      </div>
    </div>
  );
};

export default ForgetPassword;
