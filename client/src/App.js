import "./App.css";
import Login from "./login/login";
import { getAuth } from "firebase/auth";
import { app } from "./Firebase/Firebase";
//import NavigationBar from './navigation/navbar';
import SignUp from "./signup/signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import NoPage from "./pages/NoPage";
import NavigationBar from "./navigation/navbar";
import AdminPage from "./pages/Admin";
import Product from "./pages/Product";
import { useState, createContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Maps from "./pages/Maps";

export const UserContext = createContext({ user: "", setUser: () => {} });

function App() {
  const [user, setUser] = useState("Guest");
  const [uid, setUid] = useState("");
  const [count, setCount] = useState("");

  useEffect(() => {
    fetch("/api/getordercount")
      .then((res) => res.json())
      .then((data) => {
        setCount(data);
      });
  }, []);

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
    }
  });

  return (
    <UserContext.Provider
      value={{ uid, user, setUser, setUid, count, setCount }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavigationBar />}>
            <Route index element={<Home user={user} />} />
            <Route path="login" element={<Login setUser={setUser} />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="*" element={<NoPage />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="product" element={<Product />} />
            <Route path="maps" element={<Maps />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
