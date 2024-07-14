import "./App.css";
import { getAuth } from "firebase/auth";
import { app } from "./Firebase/Firebase";
import { useState, createContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import RoutesComponent from "./Routes/Routes";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState("Guest");
  const [uid, setUid] = useState("");
  const [count, setCount] = useState("");

  // Initialize Firebase Authentication and get a reference to the service

  const auth = getAuth(app);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      //const uid = user.uid;
      setUser(user.email);
      setUid(user.uid);
      // ...
    } else {
      // User is signed out
      // ...
      console.log("User logged out");
    }
  });

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uid }),
  };

  useEffect(() => {
    fetch(`/api/getordercount`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setCount(data);
      });
  }, [uid]);

  return (
    <UserContext.Provider
      value={{ uid, user, setUser, setUid, count, setCount }}
    >
      <RoutesComponent />
    </UserContext.Provider>
  );
}

export default App;
