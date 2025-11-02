import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import mediaUpload from "../utils/mediaUpload";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    axios
      .get(import.meta.env.VITE_API_URL + "/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setUser(res.data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      });
  }, []);

  // Empty functions to be implemented later
  const updateUserData = async () => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      image: user.image,
    };
    if (image != null) {
      const link = await mediaUpload(image);
      image.profilePicture = link;
    }

    await axios
      .put(import.meta.env.VITE_API_URL + "/api/users/me", data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        alert("profile updated successfully");
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        alert("failed to update profile");
      });
    navigate("/");
  };

  const updatePassword = async () => {
    if (password !== confirmPassword) {
      toast.error("password do not match");
      return;
    }
    await axios
      .put(
        import.meta.env.VITE_API_URL + "api/users/me/password",
        {
          password: password,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(() => {
        toast.success("password updated successfully");
        setPassword("");
        setConfirmPassword("");
      })
      .catch((err) => {
        console.error("Error updating password :", err);
        toast.error("Failed to update password");
      });
    navigate("/");
  };

  return (
    <div className="w-full h-full bg-[url('bg.jpg')] bg-cover bg-center bg-no-repeat flex flex-col lg:flex-row justify-center items-center p-6">
      {/* Left Panel – User Info */}
      <div className="w-full lg:w-[40%] backdrop-blur-2xl bg-primary/70 rounded-2xl m-6 p-6 flex flex-col shadow-xl border border-secondary/20">
        <h1 className="text-2xl font-bold mb-6 text-center text-secondary">
          User Information
        </h1>

        <label className="font-semibold text-secondary mb-2">First Name</label>
        <input
          type="text"
          className="mb-4 p-3 rounded-xl outline-none border border-secondary/30 focus:border-accent transition"
          placeholder="Enter first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label className="font-semibold text-secondary mb-2">Last Name</label>
        <input
          type="text"
          className="mb-4 p-3 rounded-xl outline-none border border-secondary/30 focus:border-accent transition"
          placeholder="Enter last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label className="font-semibold text-secondary mb-2">
          Profile Image
        </label>
        <input
          type="file"
          accept="image/*"
          className="mb-6"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          onClick={updateUserData}
          className="bg-accent text-white font-semibold py-3 rounded-xl hover:bg-secondary transition"
        >
          Update Information
        </button>
      </div>

      {/* Right Panel – Password Change */}
      <div className="w-full lg:w-[40%] backdrop-blur-2xl bg-primary/70 rounded-2xl m-6 p-6 flex flex-col shadow-xl border border-secondary/20">
        <h1 className="text-2xl font-bold mb-6 text-center text-secondary">
          Change Password
        </h1>

        <label className="font-semibold text-secondary mb-2">
          New Password
        </label>
        <input
          type="password"
          className="mb-4 p-3 rounded-xl outline-none border border-secondary/30 focus:border-accent transition"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="font-semibold text-secondary mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          className="mb-6 p-3 rounded-xl outline-none border border-secondary/30 focus:border-accent transition"
          placeholder="Re-enter new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          onClick={updatePassword}
          className="bg-accent text-white font-semibold py-3 rounded-xl hover:bg-secondary transition"
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default Setting;
