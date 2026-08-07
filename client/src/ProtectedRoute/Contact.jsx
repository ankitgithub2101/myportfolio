import React from "react";

function Contact() {
  return (
    <section className="face face--contact-form">
      <p className="kicker">Contact Me</p>

      <h2 className="face__title">Get In Touch</h2>

      <form className="contact-form">
        <label>
          Name
          <input type="text" />
        </label>

        <label>
          Email
          <input type="email" />
        </label>

        <label>
          Message
          <textarea rows="4"></textarea>
        </label>

        <button className="btn">Send Message</button>
      </form>

      <div className="face__footer" style={{ marginTop: "1rem" }}>
        <span>08 Contact Me</span>
      </div>
    </section>
  );
}

export default Contact;
