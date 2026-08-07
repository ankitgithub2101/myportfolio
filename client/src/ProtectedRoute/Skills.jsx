import React from "react";
import "../Components/Book/Book.css";

function Skills() {
  const skills = [
    {
      name: "React.js",
      icon: "⚛️",
      level: "Frontend Development",
    },
    {
      name: "Node.js",
      icon: "🟢",
      level: "Backend Development",
    },
    {
      name: "Express.js",
      icon: "🚀",
      level: "API Development",
    },
    {
      name: "MongoDB",
      icon: "🍃",
      level: "Database Management",
    },
    {
      name: "PHP",
      icon: "🐘",
      level: "Server Side Development",
    },
    {
      name: "MySQL",
      icon: "🗄️",
      level: "Relational Database",
    },
  ];

  return (
    <section className="face face--skills">
      <p className="kicker">Skills</p>

      <h2 className="face__title">My Technical Expertise</h2>

      <p className="face__body">
        Technologies I use to build modern, scalable and responsive web
        applications.
      </p>

      <div className="skills">
        {skills.map((skill, index) => (
          <div className="skill" key={index}>
            <span className="skill__icon">{skill.icon}</span>

            <div>
              <strong>{skill.name}</strong>
              <small>{skill.level}</small>
            </div>
          </div>
        ))}
      </div>
      <div className="face__footer">
        <span>02 Services</span>
        <span>Scroll Up/Down →</span>
      </div>
    </section>
  );
}

export default Skills;
