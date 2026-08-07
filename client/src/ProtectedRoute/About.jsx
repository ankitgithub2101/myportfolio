import React from "react";
import { TypeAnimation } from "react-type-animation";
import "../Components/Book/Book.css";

function About() {
  return (
    <section className="face">
      <h1 className="face__title">Who I Am</h1>

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
        <br />
        .I enjoy building modern, responsive web applications and continuously
        learning new technologies.
      </p>

      <div className="face__footer">
        <span>About Me</span>
        <span>01</span>
      </div>
    </section>
  );
}

export default About;
