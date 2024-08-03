import { useAuth } from "../../AuthContext/AuthContext";
export default function Home() {
  const { isLoggedIn, loggedUser } = useAuth();
  return (
    <>
      <div>{isLoggedIn}</div>
      <div>Hello</div>
      <div>{isLoggedIn === true ? loggedUser.lastname : "no user"}</div>
    </>
  );
}
