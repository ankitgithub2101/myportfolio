import React from "react";
import "../Components/Book/Book.css";

function Testimonials() {
  const reviews = [
    {
      text: "Amazing website quality and professional work.",
      name: "Business Client",
    },
    {
      text: "Explained development concepts clearly and practically.",
      name: "Students",
    },
  ];

  return (
    <section className="face face--testimonials">
      <p className="kicker">Testimonials — 7</p>

      <h1 className="face__title">Client Words</h1>

      {reviews.map((item, index) => (
        <figure className="quote" key={index}>
          <blockquote>"{item.text}"</blockquote>

          <figcaption>
            <strong>{item.name}</strong>
          </figcaption>
        </figure>
      ))}
    </section>
  );
}

export default Testimonials;
