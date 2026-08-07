import React from "react";
import "../Components/Book/Book.css";

function About() {
  return (
    <section className="face face--about">
      <p className="kicker">About</p>

      <h1 className="face__title">Who I Am</h1>

      <p className="face__body">
        I am a developer focused on creating modern, interactive web experiences
        with React, JavaScript and creative design.
      </p>

      <div className="face__footer">
        <span>About Page</span>
        <span>01</span>
      </div>
    </section>
  );
}

export default About;
