import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import mediaUpload from "../utils/mediaUpload";
const anonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppYnlwaWVqdnlqbWp1cHp2a2F5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5ODc4MTgsImV4cCI6MjA3NjU2MzgxOH0.8AoXnp-U6Mm34RQHgrv83o5iFMConHODmmliCGhXj-8";
const superbaseurl = "https://jibypiejvyjmjupzvkay.supabase.co";

const superbase = createClient(superbaseurl, anonKey);

const TextPage = () => {
  const [file, setFile] = useState(null);

  const uploadImage = async () => {
    const link = await mediaUpload(file);
    console.log(link);
  };
  return (
    <div className="w-full h-full flex justify-center items-center">
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <button
        className="bg-blue-600 text-white p-2 rounded"
        onClick={uploadImage}
      >
        upload
      </button>
    </div>
  );
};

export default TextPage;
