import React from "react";

function Awards() {
  const stats = [
    {
      number: "20+",
      label: "Web Projects",
    },
    {
      number: "5+",
      label: "Years Experience",
    },
    {
      number: "100%",
      label: "Client Focus",
    },
    {
      number: "24/7",
      label: "Support",
    },
  ];

  const awards = [
    "Best UI Design Recognition",
    "SEO Growth Results",
    "Fast Performance Websites",
  ];

  return (
    <section className="face face--awards">
      <p className="kicker">Awards & Achievements</p>

      <h1 className="face__title">Numbers Matter</h1>

      <div className="stats">
        {stats.map((item, index) => (
          <div className="stat" key={index}>
            <b>{item.number}</b>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <ul className="awards">
        {awards.map((award, index) => (
          <li key={index}>{award}</li>
        ))}
      </ul>

      <div className="face__footer">
        <span>06 Awards</span>
        <span>Scroll Up/Down →</span>
      </div>
    </section>
  );
}

export default Awards;
