import { API_BASE_URL } from "../util/constants";

export const updateProfileImage = async (image: string) => {
  const res = await fetch(API_BASE_URL + `/profile-image`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ profileImage: image }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }

  return (await res.json()) as { profileImage: string };
};
