// import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { signUrl } from "../api/s3";
import { updateProfileImage } from "../api/profile";

export default function Home() {
  const { user, logout } = useAuth();
  // const [uploading, setUploading] = useState<boolean>(false);

  const onAvatarClicked = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log(`Selected file size: ${file.size} bytes`);
        handleUpload(file);
      }
    };
    fileInput.click();
  };

  const handleUpload = async (file: File) => {
    // setUploading(true);

    try {
      // Step 1: Get signed URL from the mock API
      const response = await signUrl(file.type);
      const { url, fields } = response;

      // Step 2: Upload file to S3 using signed URL
      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append("file", file);

      const uploadResponse = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image to S3.");
      }

      // Step 3: Get the uploaded file URL
      const imageUrl = url.split("?")[0];

      // Step 4: Update user profile with the new image
      await updateProfileImage(user!.id || "", imageUrl);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    } finally {
      // setUploading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-xs sm:w-lg mx-auto sm:h-screen text-center sm:text-start">
        <div className="flex flex-col justify-center items-center mt-10 sm:mt-0">
          <div className="relative  cursor-pointer" onClick={onAvatarClicked}>
            <img
              src={user?.profileImage || "/no-image.png"}
              alt="avatar"
              className="w-16 h-16 sm:w-48 sm:h-48 rounded-md inline"
            />
            {/* <div className="absolute top-[-60%]">
              <span className="pb-20">click to update avatar</span>
              <img
                style={{ transform: "rotate(90deg)" }}
                src="/arrow.png"
                alt="arrow"
                className="w-24 h-auto mx-auto"
              />
            </div> */}
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold">Welcome, {user?.name}</h1>
          <p className="mt-2 text-2xl">{user?.email}</p>
        </div>
      </div>
      <button
        onClick={() => logout()}
        className="mt-4 px-4 py-2  text-gray-400 underline rounded fixed bottom-2 right-2 cursor-pointer"
      >
        Logout
      </button>
    </>
  );
}
