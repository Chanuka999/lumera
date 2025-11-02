import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { LogOut, Settings, ShoppingBag, User, ChevronDown } from "lucide-react";

const UserData = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogoutConfirmOpen(true);
    setUser(null);
    setDropdownOpen(false);
    window.location.href = "/login";
  };

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex justify-center items-center min-h-[60px] px-4">
      {isLogoutConfirmOpen && (
        <div className="fixed z-[120] w-full h-screen top-0 left-0 bg-black/30">
          <div className="w-[200px] h-[150px] bg-primary rounded-lg p-4 flex flex-col">
            <span className="text-lg">Are you sure you want to logout</span>
            <button></button>
            <button></button>
          </div>
        </div>
      )}
      {loading ? (
        <UserSkeleton />
      ) : user ? (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="hidden lg:flex w-[180px] items-center gap-3 px-3 py-2 rounded-xl hover:bg-secondary/10 transition-all duration-200 group"
            aria-label="User menu"
          >
            <div className="relative">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.firstName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/50"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-white font-semibold text-sm ring-2 ring-primary/50">
                  {getInitials(user.firstName + " " + (user.lastName || ""))}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>

            <span className="hidden md:block font-medium text-secondary">
              {user.firstName}
            </span>

            <ChevronDown
              className={`w-4 h-4 text-secondary/70 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-primary/20 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-3 border-b border-primary/10">
                <p className="font-semibold text-secondary">{user.firstName}</p>
                <p className="text-sm text-secondary/60 truncate">
                  {user.email}
                </p>
              </div>

              <ul className="py-2">
                <MenuItem
                  icon={<User className="w-4 h-4" />}
                  label="Account Settings"
                  href="/setting"
                />
                <MenuItem
                  icon={<ShoppingBag className="w-4 h-4" />}
                  label="My Orders"
                  href="/orders"
                />
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-accent/10 text-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="font-medium">Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <a
          href="/login"
          className="bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Login
        </a>
      )}
    </div>
  );
};

// Skeleton Loader
const UserSkeleton = () => (
  <div className="flex items-center gap-3 animate-pulse">
    <div className="w-10 h-10 rounded-full bg-primary/30"></div>
    <div className="hidden md:block w-24 h-4 bg-primary/30 rounded"></div>
  </div>
);

// Reusable Menu Item
const MenuItem = ({ icon, label, href, onClick }) => (
  <li>
    <a
      href={href || "#"}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className="flex items-center gap-3 px-4 py-2.5 text-secondary/80 hover:bg-accent/5 hover:text-accent transition-colors"
    >
      {icon}
      <span className="font-medium">{label}</span>
    </a>
  </li>
);

export default UserData;
