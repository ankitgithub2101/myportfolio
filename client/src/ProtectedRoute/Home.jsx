import React from "react";
import { useSelector } from "react-redux";
import "../Components/Book/Book.css";

function Home() {
  const { user } = useSelector((state) => state.users);

  return (
    <section className="face face--cover">
      <p className="kicker">Portfolio</p>

      <h1 className="cover__name">
        Welcome to
        <br />
        Myportfolio
      </h1>

      <p className="cover__role">Web Developer & Interaction Artist</p>

      {user && (
        <div className="cover-user">
          <div>
            <h3>{user.name}.. You got an access you can view my portfolio</h3>
          </div>
        </div>
      )}

      <div className="scroll-hint">
        <span>Scroll to open</span>
        <i className="arrow">↓</i>
      </div>
    </section>
  );
}

export default Home;
