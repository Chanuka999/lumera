import "./App.css";
import ProductCard from "./components/ProductCard";
import { Route, Routes } from "react-router-dom";
import AdminPage from "./pages/adminPage";
import HomePage from "./pages/HomePage";
import TextPage from "./pages/TextPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import RegisterPage from "./pages/RegisterPage";
import ForgetPassword from "./pages/forget-password";

function App() {
  return (
    <div className="w-full h-[100vh] ">
      <Toaster position="top right" />
      <Routes path="/">
        <Route path="/*" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="forget-password" element={<ForgetPassword />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="text" element={<TextPage />} />
      </Routes>
    </div>
  );
}

export default App;
