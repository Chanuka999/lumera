import "./App.css";
import ProductCard from "./components/ProductCard";
import { Route, Routes } from "react-router-dom";
import AdminPage from "./pages/adminPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="w-full h-[100vh] bg-red-500">
      <Routes path="/">
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<h1>register page</h1>} />
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    </div>
  );
}

export default App;
