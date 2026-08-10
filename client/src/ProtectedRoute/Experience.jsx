import React from "react";
import "../Components/Book/Book.css";

function Experience() {
  return (
    <section className="face face--experience">
      <p className="kicker">Experience — 3</p>

      <h1 className="face__title">My Experience</h1>

      <p className="face__body">
        Experienced in modern web development, creating responsive, user-focused
        websites and applications with clean architecture and scalable
        solutions.
      </p>

      <ul className="timeline">
        <li>
          <span className="timeline__year">2024 - 2026</span>
          <strong>Full-Stack Web Developer</strong>
          <em>
            Training students in PHP development, MERN Stack, frontend
            development, and hands-on web application projects using modern
            technologies.
          </em>
        </li>

        <li>
          <span className="timeline__year">2023 - 2024</span>
          <strong>Freelancing</strong>
          <em>
            Developed responsive frontend websites, managed PHP hosting and
            deployments, and created professional HTML email templates for
            clients.
          </em>
        </li>
        <li>
          <span className="timeline__year">2022 - 2022</span>
          <strong>Web Developer</strong>
          <em>
            Designing and developing modern websites, dashboards, and
            interactive web applications.
          </em>
        </li>
      </ul>
    </section>
  );
}

export default Experience;
