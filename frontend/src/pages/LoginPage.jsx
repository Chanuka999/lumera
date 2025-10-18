import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/users/login",
        {
          email: email,
          password: password,
        }
      );
      localStorage.setItem("token", response.data.token);

      const user = response.data.user;
      if (user.role == "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      toast.success("Login successful");
    } catch (error) {
      console.error(error);
      toast.error("login failed.please check your credential");
    }
  };

  return (
    <div className="w-full h-screen bg-[url('bg.jpg')] bg-cover bg-center flex font-sans">
      {/* Left Decorative Side */}
      <div className="w-[50%] h-full bg-gradient-to-br flex flex-col justify-center items-center relative overflow-hidden">
        <img
          src="/logo.png"
          alt="CBC Logo"
          className="w-48 h-auto mb-6 animate-pulse opacity-90"
        />
        <h1 className="text-4xl font-bold text-[var(--color-secondary)] tracking-tight">
          Crystal Beauty Clear
        </h1>
        <p className="text-lg text-[var(--color-secondary)] mt-4 max-w-md text-center">
          Discover the essence of beauty with our premium cosmetic collection.
        </p>
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-64 h-64 bg-[var(--color-accent)]/30 rounded-full absolute -top-32 -left-32"></div>
          <div className="w-80 h-80 bg-[var(--color-primary)]/30 rounded-full absolute bottom-0 right-0"></div>
        </div>
      </div>

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
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 px-4 bg-white/80 text-[var(--color-secondary)] rounded-lg border border-[var(--color-primary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all placeholder:text-[var(--color-secondary)]/50"
          />
          <button
            onClick={handleLogin}
            className="w-full h-12 bg-[var(--color-accent)] text-white font-medium rounded-lg hover:bg-[var(--color-accent)]/80 transition-all duration-300 shadow-md"
          >
            Login
          </button>
          <p className="text-sm text-[var(--color-secondary)]/70">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-[var(--color-accent)] hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
