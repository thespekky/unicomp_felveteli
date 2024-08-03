import Cookies from "universal-cookie";
const cookies = new Cookies();
export async function LoginUser(path, body) {
  try {
    const response = await fetch(
      "http://localhost:" + import.meta.env.VITE_PORT + path,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    /* console.log(response.message);
    if (!response.ok) {
      return { message: "Hiba a belépés során", success: false };
    }*/
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    return { message: e.message };
  }
}
