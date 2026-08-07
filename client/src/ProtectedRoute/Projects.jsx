import React from "react";
import "../Components/Book/Book.css";

function Projects() {
  const projects = [
    {
      title: "Nova Dashboard",
      type: "React + Redux",
      color: "#7c3aed",
      description:
        "Modern admin dashboard with authentication and state management.",
    },
    {
      title: "E-Commerce UI",
      type: "React + Tailwind",
      color: "#06b6d4",
      description: "Responsive shopping experience with clean animations.",
    },
    {
      title: "Portfolio Book",
      type: "GSAP + 3D",
      color: "#ec4899",
      description: "Interactive 3D scrolling portfolio built like a real book.",
    },
    {
      title: "Task Manager",
      type: "MERN Stack",
      color: "#22c55e",
      description: "Full-stack productivity application.",
    },
  ];

  return (
    <section className="face face--projects">
      <p className="kicker">Selected Work</p>

      <h1 className="face__title">Projects</h1>

      <p className="face__body">
        A collection of digital experiences, applications, and experiments built
        with modern technologies.
      </p>

      <div className="projects">
        {projects.map((project, index) => (
          <article
            className="project"
            key={index}
            style={{ "--c": project.color }}
          >
            <span className="project__thumb"></span>

            <div className="project__meta">
              <strong>{project.title}</strong>

              <em>{project.type}</em>

              <small>{project.description}</small>
            </div>
          </article>
        ))}
      </div>

      <div className="face__footer">
        <span>04 Projects</span>
        <span>Scroll Up/Down →</span>
      </div>
    </section>
  );
}

export default Projects;
