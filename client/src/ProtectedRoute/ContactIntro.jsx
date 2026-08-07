import React from "react";
import "../Components/Book/Book.css";

function ContactIntro() {
  return (
    <section className="face face--contact-intro">
      <p className="kicker">Let's Connect</p>

      <h1 className="face__title">Have a Project Idea?</h1>

      <p className="face__body">
        I help businesses and individuals build modern websites, improve online
        presence, and create digital experiences that make an impact.
      </p>

      <div className="contact-options">
        <div className="contact-card">
          <span>01</span>
          <strong>Website Development</strong>
          <p>
            Custom React websites, landing pages, and modern UI experiences.
          </p>
        </div>

        <div className="contact-card">
          <span>02</span>
          <strong>Business Growth</strong>
          <p>SEO, hosting solutions, and performance optimization.</p>
        </div>

        <div className="contact-card">
          <span>03</span>
          <strong>Let's Work Together</strong>
          <p>Turn your idea into a professional digital product.</p>
        </div>
      </div>

      <div className="face__footer">
        <span>07 Contract</span>
        <span>Next →</span>
      </div>
    </section>
  );
}

export default ContactIntro;
