export const signUrl = async (type: string) => {
  const res = await fetch(
    import.meta.env.VITE_API_BASE_URL + "/s3/sign-url?fileType=" + type
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }

  return (await res.json()) as { url: string; fields: Record<string, string> };
};
