import './App.css';
import Login from './login/login';
import { getAuth } from "firebase/auth";
import { app } from './Firebase/Firebase';
//import NavigationBar from './navigation/navbar';
import SignUp from './signup/signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import NoPage from "./pages/NoPage";
import NavigationBar from './navigation/navbar';
import AdminPage from './pages/Admin';
import Product from './pages/Product';
import { useState, createContext } from "react";

export const UserContext = createContext({user:'',setUser:()=>{}})

function App() {
  const [user, setUser] = useState("Guest");
  // Initialize Firebase Authentication and get a reference to the service
  getAuth(app);

  return (
    <UserContext.Provider value={{user,setUser}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavigationBar />}>
          <Route index element={<Home user={user}/>} />
          <Route path="login" element={<Login setUser={setUser}/>} />
          <Route path="signup" element={<SignUp />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="*" element={<NoPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="product" element={<Product />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </UserContext.Provider>
  );
}

export default App;
