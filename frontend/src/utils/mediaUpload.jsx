import { createClient } from "@supabase/supabase-js";

const anonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppYnlwaWVqdnlqbWp1cHp2a2F5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5ODc4MTgsImV4cCI6MjA3NjU2MzgxOH0.8AoXnp-U6Mm34RQHgrv83o5iFMConHODmmliCGhXj-8";
const superbaseurl = "https://jibypiejvyjmjupzvkay.supabase.co";

const superbase = createClient(superbaseurl, anonKey);

const mediaUpload = (file) => {
  return new Promise((resolve, reject) => {
    if (file == null) {
      reject("No file selected");
    } else {
      const timestamp = new Date().getTime();
      const fileName = timestamp + file.name;
      superbase.storage
        .from("images")
        .upload(fileName, file, {
          upsert: false,
          cacheControl: "3600",
        })
        .then(() => {
          const publicUrl = superbase.storage
            .from("images")
            .getPublicUrl(fileName).data.publicUrl;
          resolve(publicUrl);
        })
        .catch(() => {
          reject("An error occured");
        });
    }
  });
};

export default mediaUpload;
