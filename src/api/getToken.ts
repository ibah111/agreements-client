import axios from "axios";
import config from "../config/server.json";
const requests = axios.create({
  baseURL: config.oauth,
  withCredentials: true,
});
export async function checkToken(token: string) {
  const res = await requests.post<boolean>("oauth/check", {
    token,
  });
  return res.data;
}
export async function authorize() {
  const res = await requests.get<string | false>("oauth/authorize");
  return res.data;
}
export function redirect() {
  window.location.replace(
    config.oauth + `/oauth/authorize?origin=${window.location.href}`
  );
}
export async function getLogin() {
  const result = await authorize();
  if (result) return result;
  redirect();
  throw Error("Переадресация не прошла");
}
export default async function getToken() {
  const token = await getLogin();
  if (!(await checkToken(token))) redirect();
  console.log(token);
  return token;
}
