export const signOut = async () => {
  const response = await fetch("api/auth/signout", { method: "Post" });
  if (response.ok)
    return true;
  return false;
}