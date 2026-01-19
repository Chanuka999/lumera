import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password != confirmPassword) {
      toast.error("password do not match");
      return;
    }
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/users",
        {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
        },
      );
      toast.success("registration successful please login");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("login failed.please check your credential");
    }
  };

  return (
    <div className="w-full h-screen bg-[url('bg.jpg')] bg-cover bg-center flex font-sans">
      {/* Right Login Form Side */}
      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="w-[500px] p-8 backdrop-blur-xl bg-white/30 shadow-2xl rounded-2xl flex flex-col justify-center items-center gap-6 border border-[var(--color-primary)]/50">
          <h2 className="text-3xl font-semibold text-[var(--color-secondary)] mb-4">
            Welcome Back
          </h2>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 bg-white/80 text-[var(--color-secondary)] rounded-lg border border-[var(--color-primary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all placeholder:text-[var(--color-secondary)]/50"
          />
          <input
            type="first name"
            placeholder="Enter your name"
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full h-12 px-4 bg-white/80 text-[var(--color-secondary)] rounded-lg border border-[var(--color-primary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all placeholder:text-[var(--color-secondary)]/50"
          />
          <input
            type="last name"
            placeholder="Enter your last name"
            onChange={(e) => setLastName(e.target.value)}
            className="w-full h-12 px-4 bg-white/80 text-[var(--color-secondary)] rounded-lg border border-[var(--color-primary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all placeholder:text-[var(--color-secondary)]/50"
          />
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 px-4 bg-white/80 text-[var(--color-secondary)] rounded-lg border border-[var(--color-primary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all placeholder:text-[var(--color-secondary)]/50"
          />
          <input
            type="password"
            placeholder="Enter your confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full h-12 px-4 bg-white/80 text-[var(--color-secondary)] rounded-lg border border-[var(--color-primary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all placeholder:text-[var(--color-secondary)]/50"
          />
          <button
            onClick={handleRegister}
            className="w-full h-12 bg-[var(--color-accent)] text-white font-medium rounded-lg hover:bg-[var(--color-accent)]/80 transition-all duration-300 shadow-md"
          >
            Register
          </button>
          <p className="text-sm text-[var(--color-secondary)]/70">
            All ready have an account
            <Link
              to="/login"
              className="text-[var(--color-accent)] hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      {/* Left Decorative Side */}
      <div className="w-[50%] h-full bg-gradient-to-br flex flex-col justify-center items-center relative overflow-hidden">
        <img
          src="/logo.png"
          alt="CBC Logo"
          className="w-48 h-auto mb-6 animate-pulse opacity-90"
        />
        <h1 className="text-4xl font-bold text-[var(--color-secondary)] tracking-tight">
          Aurora Bloom
        </h1>
        <p className="text-lg text-[var(--color-secondary)] mt-4 max-w-md text-center">
          to connect people with nature in the easiest way possible
        </p>
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-64 h-64 bg-[var(--color-accent)]/30 rounded-full absolute -top-32 -left-32"></div>
          <div className="w-80 h-80 bg-[var(--color-primary)]/30 rounded-full absolute bottom-0 right-0"></div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
