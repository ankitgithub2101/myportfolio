import React from "react";
import { TypeAnimation } from "react-type-animation";
import "../Components/Book/Book.css";

function About() {
  return (
    <section className="face face--about">
      <p className="kicker">01 — About</p>
      <h2 className="face__title">Who am i ?</h2>

      <p className="face__body">
        I'm a B.E. graduate from Mumbai University passionate about, <br />
        <span className="typing-text">
          <TypeAnimation
            sequence={[
              "Frontend Development",
              1500,
              "Full Stack Development",
              1500,
              "MERN Stack Development",
              1500,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </span>
        <br />. I enjoy building modern, responsive web applications and
        continuously learning new technologies.
      </p>

      <h3 className="connect-title">Connect Me</h3>

      <div className="contact-info">
        <div className="contact-item">
          {" "}
          <i className="bx bx-envelope"></i>{" "}
          <a href="mailto:ashinde354@gmail.com"> ashinde354@gmail.com </a>{" "}
        </div>

        <div className="contact-item">
          {" "}
          <i className="bx bx-phone"></i>{" "}
          <a href="tel:+919773394770"> +91 9773394770 </a>{" "}
        </div>

        <div className="contact-item">
          <i className="bx bx-map"></i>
          <span>Mumbai, Maharashtra, India</span>
        </div>
      </div>
    </section>
  );
}

export default About;
