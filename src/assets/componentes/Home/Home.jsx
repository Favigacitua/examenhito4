import React, { useState } from "react";
import { NavLink, useNavigate  } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useUserContext } from "../../../Context/UserContext";
import FormularioFecha from "../FormularioFecha/FormularioFecha";
import "./home.css";

export const Home = () => {
  const { token, logout } = useUserContext();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    console.log("Login Button Clicked");
  };

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  return (
    <div className="homestyle" style={{width:"100vw"}}>
      <div>
        <Navbar
          expand="md"
          className="navbarhome"
          style={{
            backgroundColor: "transparent",
            boxShadow: "none",
            paddingBottom: "0px",
          }}
        >
          <Container
            fluid
            style={{
              padding: "0px",
              marginLeft: "1rem",
              marginRight: "1rem",
              width: "100vw",
              height: "2rem",
            }}
          >
            <Navbar.Brand
              as={NavLink}
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "navbar-brand active-link" : "navbar-brand"
              }
              style={{ fontWeight: "bold", color: "white" }}
            >
              Nautilus Prestige
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="offcanvasNavbar-expand-md"
              onClick={handleShow}
            />
            <Navbar.Offcanvas
              id="offcanvasNavbar-expand-md"
              aria-labelledby="offcanvasNavbarLabel-expand-md"
              placement="end"
              show={showOffcanvas}
              onHide={handleClose}
            >
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link
                    as={NavLink}
                    to="/destinos"
                    onClick={handleClose}
                    className={({ isActive }) =>
                      isActive ? "nav-link active-link" : "nav-link"
                    }
                  >
                    Destinos
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/contacto"
                    onClick={handleClose}
                    className={({ isActive }) =>
                      isActive ? "nav-link active-link" : "nav-link"
                    }
                  >
                    Contacto
                  </Nav.Link>

                  {token ? (
                    <>
                      <Nav.Link
                        as={NavLink}
                        to="/perfil"
                        onClick={handleClose}
                        className={({ isActive }) =>
                          isActive ? "nav-link active-link" : "nav-link"
                        }
                      >
                        Perfil
                      </Nav.Link>
                      <Button
                        className="loginButton"
                        style={{
                          backgroundColor: "#0DBCAD",
                          border: "2px solid #0DBCAD",
                        }}
                        onClick={() => {
                          logout();
                          handleClose();
                        }}
                      >
                        Cerrar sesión
                      </Button>
                    </>
                  ) : (
                    <>
                      <Nav.Link
                        as={NavLink}
                        to="/register"
                        onClick={handleClose}
                        className={({ isActive }) =>
                          isActive ? "nav-link active-link" : "nav-link"
                        }
                      >
                        Registrarse
                      </Nav.Link>
                      <Button
                        className="loginButton"
                        style={{
                          backgroundColor: "#0DBCAD",
                          border: "2px solid #0DBCAD",
                        }}

                        onClick={() => {
                          handleLoginClick();
                          handleClose();
                          navigate("/login");
                        }}
                      >
                        Iniciar Sesion
                      </Button>
                    </>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
        <div className="bajadanavbar">
          <div>
            <img
              src="/viajaconnosotros.png"
              alt="viaja-con-nosotros"
              className="viajaconnosotros"
            />
          </div>
          <div className="contenttext">
            <img src="/vamonos.png" alt="vamonos" className="vamonos" />
            <p className="bajadatitulo">
              Elije una fecha y nosotros cumplimos tus sueños
            </p>
          </div>
          <div className="formulariofecha">
            <FormularioFecha />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
