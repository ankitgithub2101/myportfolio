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
      name: "Student",
    },
  ];

  return (
    <section className="face face--testimonials">
      <p className="kicker">Testimonials</p>

      <h1 className="face__title">
        Client <br /> Words
      </h1>

      {reviews.map((item, index) => (
        <figure className="quote" key={index}>
          <blockquote>"{item.text}"</blockquote>

          <figcaption>
            <strong>{item.name}</strong>
          </figcaption>
        </figure>
      ))}

      <div className="face__footer">
        <span>07 Testimonials</span>
        <span>Scroll Up/Down →</span>
      </div>
    </section>
  );
}

export default Testimonials;
