import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";
import { getAuth, signOut } from "firebase/auth";
import Button from "react-bootstrap/Button";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";

function NavigationBar() {
  const navigate = useNavigate();
  const { user, setUser, setUid, count } = useContext(UserContext);

  function LogOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUser("Guest");
        setUid("");
        // Sign-out successful.
      })
      .catch((error) => {
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
            <Nav.Link href="/blogs">Blogs</Nav.Link>
            <Nav.Link href="/maps">Contact Us</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Container>
        <Button
          onClick={() => navigate("/cart")}
          style={{ marginInline: "25px" }}
        >
          <i className="bi bi-cart" style={{ marginInline: "25px" }}>
            {count}
          </i>
        </Button>
        <>
          You are logged in as {user}
          <Button
            onClick={LogOut}
            style={{ marginInline: "25px" }}
            type="button"
            variant="light"
          >
            Log Out
          </Button>
        </>
      </Navbar>
      <Outlet />
    </>
  );
}

export default NavigationBar;
