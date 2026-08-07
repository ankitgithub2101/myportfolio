import React from "react";
import { useSelector } from "react-redux";

function ThankYou() {
  const { user } = useSelector((state) => state.users);

  return (
    <section className="face face--thankyou">
      {user && <p className="kicker">{user.name}</p>}

      <h1 className="thankyou__title">
        THANK
        <br />
        YOU
      </h1>

      <p className="thankyou__text">
        Thank you for taking the time to explore my creative journey.
        <br />
        Every project represents passion, learning, and dedication.
        <br />
        I am always excited to collaborate, build meaningful experiences,
        <br />
        and bring new ideas to life.
      </p>

      <div className="scroll-hint">
        <span>End of Portfolio</span>
        <i className="arrow">✦</i>
      </div>
    </section>
  );
}

export default ThankYou;
