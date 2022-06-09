import jwtDecode from "jwt-decode";

export const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  //check exp time off accessToken
  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};
