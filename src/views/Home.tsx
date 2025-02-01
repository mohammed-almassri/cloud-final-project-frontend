import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import encode from "../util/encode";

export default function Home() {
  const { user, logout, updateProfileImage } = useAuth();
  const [uploading, setUploading] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const onAvatarClicked = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const image64 = await encode(file);
        setPreviewUrl(image64);
        setUploading(true);
        try {
          await updateProfileImage(image64);
        } catch (err) {
          alert("Failed to upload image. Please try again.");
        } finally {
          setUploading(false);
        }
      }
    };
    fileInput.click();
  };

  return (
    <>
      <div className="sm:h-screen flex flex-col justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-xs sm:w-2xl mx-auto  text-center sm:text-start bg-white rounded-xl p-10 mt-10 sm:mt-0">
          <div className="flex flex-col justify-center items-center mt-10 sm:mt-0">
            <div
              className="relative  cursor-pointer"
              onClick={uploading ? () => {} : onAvatarClicked}
            >
              <img
                src={
                  uploading
                    ? previewUrl!
                    : user?.profileImage || "/no-image.png"
                }
                alt="avatar"
                className={`w-16 h-16 sm:w-48 sm:h-48 rounded-md inline ${
                  uploading ? "opacity-50" : ""
                }`}
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

              <div
                className={`absolute top-[0%] left-[-20%] text-amber-500 z-50 font-bold border border-amber-500 rounded-md p-1 rotate-[-45deg] bg-amber-100
                   ${uploading ? "opacity-0" : "opacity-100"}`}
              >
                click to update
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold">Welcome, {user?.name}</h1>
            <p className="mt-2 text-2xl">{user?.email}</p>
          </div>
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
