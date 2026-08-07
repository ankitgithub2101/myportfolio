import React from "react";
import "../Components/Book/Book.css";

function Experience() {
  return (
    <section className="face face--experience">
      <p className="kicker">Experience</p>

      <h1 className="face__title">
        Building
        <br />
        Digital Experiences
      </h1>

      <p className="face__body">
        Experienced in modern web development, creating responsive, user-focused
        websites and applications with clean architecture and scalable
        solutions.
      </p>

      <ul className="timeline">
        <li>
          <span className="timeline__year">2022 - Present</span>
          <strong>Web Developer</strong>
          <em>
            Designing and developing modern websites, dashboards, and
            interactive web applications.
          </em>
        </li>

        <li>
          <span className="timeline__year">2023 - Present</span>
          <strong>Frontend Developer</strong>
          <em>
            Building React interfaces with responsive layouts, animations, and
            reusable components.
          </em>
        </li>

        <li>
          <span className="timeline__year">2024 - Present</span>
          <strong>Web Development Trainer</strong>
          <em>
            Training students in HTML, CSS, JavaScript, React, and practical
            project development.
          </em>
        </li>
      </ul>

      <div className="face__footer">
        <span>03 Experience</span>
        <span>Scroll Up/Down →</span>
      </div>
    </section>
  );
}

export default Experience;
