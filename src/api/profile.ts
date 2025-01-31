export const updateProfileImage = async (id: string, image: string) => {
  const res = await fetch(
    import.meta.env.VITE_API_BASE_URL + `/user/${id}/profile-image`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, image }),
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }

  return (await res.json()) as { profileImage: string };
};
