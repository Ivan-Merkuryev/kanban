import Cookies from "js-cookie";

export enum EnumTokens {
  "ACCESS_TOKEN" = "accessToken",
  "REFRESH_TOKEN" = "refreshToken",
}

export const getAccessToken = () => {
  const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN);
  return accessToken || null;
};

export const decoderToken = (refreshToken: string | undefined): any => {
  // В данной функции предполагается, что у вас используется JWT токен для аутентификации
  if (!refreshToken) return null;
  const base64Url = refreshToken.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const payload = JSON.parse(atob(base64));

  return payload
};

// export const decodToken = (refreshToken: string) => {
//   // В данной функции предполагается, что у вас используется JWT токен для аутентификации
//   if (!refreshToken) return null;
//   const base64Url = refreshToken.split(".")[1];
//   const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//   const payload = JSON.parse(atob(base64));

//   return payload
// };

export const saveTokenStorage = (accessToken: string) => {
  Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
    domain: "localhost",
    sameSite: "strict",
    expires: 1,
  });
};

export const removeFromStorage = () => {
  Cookies.remove(EnumTokens.ACCESS_TOKEN);
};
