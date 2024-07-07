import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";
import { getAuth, signOut } from "firebase/auth";
import Button from 'react-bootstrap/Button';

function NavigationBar() {

  const {user, setUser} = useContext(UserContext);
  
  function LogOut(){
    const auth = getAuth();
    signOut(auth).then(() => {
      setUser('Guest')
      // Sign-out successful.
    }).catch((error) => {
    // An error happened.
    });
  }

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="home">Dashboard</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/product">Product</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signUp">SignUp</Nav.Link>
            <Nav.Link href="/blogs">Blogs</Nav.Link>
            <Nav.Link href="/maps">Location</Nav.Link>
          </Nav>
        </Container>
        <>
          You are logged in as {user} 
          <Button onClick={LogOut} style={{marginInline:"20px"}} type="button"  variant="light">Log Out</Button >
        </>

      </Navbar>
      <Outlet />
    </>
  );
}

export default NavigationBar;