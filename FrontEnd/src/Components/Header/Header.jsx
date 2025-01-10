import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { toast } from "react-toastify";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postLogout } from "../../services/apiServices";
import { doLogout } from "../../redux/action/userAction";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogout = async () => {
    const data = await postLogout(account.email, account.refresh_token);
    console.log(data);
    if (data && data.EC === 0) {
      dispatch(doLogout(data));
      toast.success(data.EM);
      navigate("/");
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary bg-light">
      <Container>
        <Link to="/" className="navbar-brand">
          React Hooks with Bootstrap
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/users" className="nav-link">
              Users
            </NavLink>
            {account.role === "ADMIN" && (
              <NavLink to="admins" className="nav-link">
                Admin
              </NavLink>
            )}
          </Nav>
          <Nav>
            {!isAuthenticated ? (
              <>
                <button className="btn-login" onClick={() => handleLogin()}>
                  Log in
                </button>
                <button className="btn-signup" onClick={() => handleRegister()}>
                  Sign Up
                </button>
              </>
            ) : (
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => handleLogout()}>
                  Log out
                </NavDropdown.Item>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
