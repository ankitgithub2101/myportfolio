import React from "react";
import { useSelector } from "react-redux";

function ThankYou() {
  const { user } = useSelector((state) => state.users);

  return (
    <section className="face face--thankyou">
      {user && <p className="kicker back-user">{user.name}</p>}

      <h1 className="thankyou__title">
        THANK
        <br />
        YOU
      </h1>

      <p className="thankyou__text">
        Thank you for taking the time to explore my creative journey.
      </p>

      <div className="scroll-hint">
        <span className="port-end">End of Portfolio</span>
        <i className="star">✦</i>
      </div>
    </section>
  );
}

export default ThankYou;
