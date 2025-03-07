import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import "./footer.css";

export const Footer = () => {
  return (
    
    <div className="footer">
      <hr style={{ border: "1px solid gray" }} />
      <div className="contenido">
        <div className="rrss">
          <h5 style={{ paddingBottom: "1rem" }}>
            Visitanos en nuestras redes sociales
          </h5>
          <div className="iconos" >
            <span className="icono">
              <FontAwesomeIcon
                icon={faFacebookF}
                style={{ width: "32px", height: "28px", color: "#0DBCAD" }}
              />
            </span>
            <span className="icono">
              <FontAwesomeIcon
                icon={faTwitter}
                style={{ width: "32px", height: "28px", color: "#0DBCAD" }}
              />
            </span>
            <span className="icono">
              <FontAwesomeIcon
                icon={faInstagram}
                style={{ width: "32px", height: "28px", color: "#0DBCAD" }}
              />
            </span>
            <span className="icono">
              <FontAwesomeIcon
                icon={faLinkedinIn}
                style={{ width: "32px", height: "28px", color: "#0DBCAD" }}
              />
            </span>
            <span className="icono">
              <FontAwesomeIcon
                icon={faYoutube}
                style={{ width: "32px", height: "28px", color: "#0DBCAD" }}
              />
            </span>
          </div>
        </div>
        <br />
        <div className="nautilus">
          <img src="/logoblanco.jpg" alt="logo nautilus prestige" />
        </div>
        <br />
        <div className="opciones">
          <div>
            <h3>Productos</h3>
            <br />
            <NavLink to="/ongoing" className="custom-link">
              Características
            </NavLink>
            <NavLink to="/ongoing" className="custom-link">
              Precios
            </NavLink>
            <NavLink to="/ongoing" className="custom-link">
              Reseñas
            </NavLink>
            <NavLink to="/ongoing" className="custom-link">
              Actualizaciones
            </NavLink>
          </div>
          <br />

          <div>
            <h3>Nosotros</h3>
            <br />
            <NavLink to="/ongoing" className="custom-link">
              Sobre nosotros
            </NavLink>
            <NavLink to="/ongoing" className="custom-link">
              Contacto
            </NavLink>
            <NavLink to="/ongoing" className="custom-link">
              Asesoramiento
            </NavLink>
            <NavLink to="/ongoing" className="custom-link">
              Blog
            </NavLink>
          </div>
          <br />

          <div>
            <h3>Soporte</h3>
            <br />
            <NavLink to="/ongoing" className="custom-link">
              Empieza por aquí
            </NavLink>
            <NavLink to="/ongoing" className="custom-link">
              Centro de ayuda
            </NavLink>
            <NavLink to="/ongoing" className="custom-link">
              Reporta un problema
            </NavLink>
            <NavLink to="/ongoing" className="custom-link">
              Chatea con nosotros
            </NavLink>
          </div>
          <br />
          <div>
            <h3 style={{ paddingBottom: "1rem" }}>Contactanos</h3>
            <br />
            <div style={{ paddingBottom: "1rem" }}>
              <FontAwesomeIcon
                icon={faEnvelope}
                style={{
                  height: "20px",
                  paddingRight: "0.2rem",
                  color: "#0DBCAD",
                }}
              />
              <span className="logo-text"> Contacto@nautilus.com</span>
            </div>
            <div style={{ paddingBottom: "1rem" }}>
              <FontAwesomeIcon
                icon={faPhone}
                style={{
                  height: "20px",
                  paddingRight: "0.2rem",
                  color: "#0DBCAD",
                }}
              />
              <span className="logo-text"> +569 9567 34 92</span>
            </div>
            <div style={{ paddingBottom: "1rem" }}>
              <FontAwesomeIcon
                icon={faLocationDot}
                style={{
                  height: "25px",
                  paddingRight: "0.2rem",
                  color: "#0DBCAD",
                }}
              />
              <span className="logo-text"> Gorbea 2455, Santiago</span>
            </div>
          </div>
          <br />
        </div>
      </div>
      <hr style={{ border: "1px solid gray" }} />
      <div style={{ padding: "1rem" }} className="finalfooter">
        <p>Copyright © 2023 </p>
        <p>
          All Rights Reserved |{" "}
          <span style={{ color: "#0DBCAD" }}>Terms and Conditions </span> |{" "}
          <span style={{ color: "#0DBCAD" }}>Privacy Policy</span>
        </p>
      </div>
    </div>
    
  );
};
