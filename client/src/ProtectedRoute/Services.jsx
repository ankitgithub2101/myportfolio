import React from "react";
import "../Components/Book/Book.css";

function Services() {
  const services = [
    {
      number: "01",
      title: "SEO Optimization",
      description:
        "Improve search rankings, increase organic traffic, and build a strong online presence.",
    },
    {
      number: "02",
      title: "Web Hosting",
      description:
        "Fast, secure, and reliable hosting solutions with performance optimization.",
    },
    {
      number: "03",
      title: "Landing Pages",
      description:
        "High-converting landing pages designed for marketing campaigns and business growth.",
    },
  ];

  return (
    <section className="face face--services">
      <p className="kicker">What I Offer</p>

      <h1 className="face__title">Services</h1>

      <p className="face__body">
        Helping businesses build a powerful digital presence through
        performance-focused solutions.
      </p>

      <div className="services">
        {services.map((service) => (
          <article className="service" key={service.number}>
            <span className="service__no">{service.number}</span>

            <strong>{service.title}</strong>

            <em>{service.description}</em>
          </article>
        ))}
      </div>

      <div className="face__footer">
        <span>05 Services</span>
        <span>Scroll Up/Down →</span>
      </div>
    </section>
  );
}

export default Services;
