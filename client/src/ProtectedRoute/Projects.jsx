import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../Components/Book/Book.css";

function Projects() {
  const projects = [
    {
      title: "Jas Global Exim",
      type: "PHP + HTML + CSS + JavaScript + SEO",
      color: "#7c3aed",
      description:
        "Developed and deployed a responsive business website using PHP, HTML, CSS, and JavaScript, with SEO optimization and Hostinger hosting.",
      link: "https://jasglobalexim.com/",
      deployment: "Hostinger",
    },

    {
      title: "React Shop UI",
      type: "React • Tailwind CSS",
      color: "#06b6d4",
      description:
        "Responsive e-commerce shopping interface built with React and Tailwind CSS, featuring a clean modern design and interactive UI.",
      link: "https://react-shop-psi-ten.vercel.app",
      deployment: "Vercel",
    },

    {
      title: "ChatWidus",
      type: "React • GraphQL • Socket.IO",
      color: "#22c55e",
      description:
        "Real-time chat application built with React, GraphQL, and Socket.IO, featuring live messaging and real-time online/offline user presence.",
      link: "https://chatwidus.netlify.app",
      deployment: "Netlify",
    },

    {
      title: "Fogg Computing",
      type: "MERN Stack • Auth • OTP",
      color: "#f59e0b",
      description:
        "Document-sharing platform featuring authentication, secure password recovery via email OTP powered by Resend, and protective responses for invalid credentials.",
      link: "https://foggcomputing.netlify.app",
      deployment: "Netlify",
    },

    {
      title: "Antics Notes",
      type: "MERN Stack • User & Admin",
      color: "#ec4899",
      description:
        "Full-stack MERN notes application where users can create and submit notes, while administrators can view and manage submitted notes.",
      link: "https://anticsnotes.netlify.app/",
      deployment: "Netlify",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextProject = () => {
    setDirection(1);

    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const previousProject = () => {
    setDirection(-1);

    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleDragEnd = (event, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    // Swipe left
    if (offset < -60 || velocity < -500) {
      nextProject();
      return;
    }

    // Swipe right
    if (offset > 60 || velocity > 500) {
      previousProject();
    }
  };

  const project = projects[currentIndex];

  return (
    <section className="face face--projects">
      <p className="kicker">Projects — 4</p>
      <h1 className="face__title">My Projects</h1>

      <p className="face__body">
        A collection of projects I’ve designed and developed, combining modern
        technologies, clean interfaces, and practical solutions.
      </p>

      {/* =========================================
          PROJECT STACK
      ========================================== */}

      <div
        className="projects project-slider"
        style={{
          "--project-color": project.color,
        }}
      >
        {/* Back card 2 */}
        <div
          className="project-stack-card project-stack-card--2"
          style={{
            borderColor: projects[(currentIndex + 2) % projects.length].color,
          }}
        />

        {/* Back card 1 */}
        <div
          className="project-stack-card project-stack-card--1"
          style={{
            borderColor: projects[(currentIndex + 1) % projects.length].color,
          }}
        />

        {/* Active project */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            className="project-slider-card"
            initial={{
              opacity: 0,
              x: direction === 1 ? 120 : -120,
              scale: 0.92,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              x: direction === 1 ? -120 : 120,
              scale: 0.92,
            }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            drag="x"
            dragDirectionLock
            dragConstraints={{
              left: 0,
              right: 0,
            }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            style={{
              touchAction: "pan-y",
            }}
          >
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project"
              style={{
                "--c": project.color,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
            >
              <span className="project__thumb"></span>

              <div className="project__meta">
                <small>Deployed on {project.deployment}</small>

                <strong>{project.title}</strong>

                <em>{project.type}</em>

                <small>{project.description}</small>
              </div>
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* =========================================
          CONTROLS
      ========================================== */}

      <div className="project-slider-controls">
        <button
          type="button"
          className="project-slider-button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            previousProject();
          }}
          aria-label="Previous project"
        >
          ←
        </button>

        <div className="project-slider-counter">
          <strong>{String(currentIndex + 1).padStart(2, "0")}</strong>

          <span>/</span>

          <span>{String(projects.length).padStart(2, "0")}</span>
        </div>

        <button
          type="button"
          className="project-slider-button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            nextProject();
          }}
          aria-label="Next project"
        >
          →
        </button>
      </div>
    </section>
  );
}

export default Projects;
