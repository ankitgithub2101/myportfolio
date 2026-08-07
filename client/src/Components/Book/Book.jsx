import React, { useEffect, useRef } from "react";
import Home from "../../ProtectedRoute/Home";
import About from "../../ProtectedRoute/About";
import Services from "../../ProtectedRoute/Services";
import Projects from "../../ProtectedRoute/Projects";
import Experience from "../../ProtectedRoute/Experience";
import Awards from "../../ProtectedRoute/Awards";
import Testimonials from "../../ProtectedRoute/Testimonials";
import Contact from "../../ProtectedRoute/Contact";
import Skills from "../../ProtectedRoute/Skills";
import ThankYou from "../../ProtectedRoute/ThankYou";
import initBookAnimation from "../Book/BookAnimation";
import Leaf from "../Leaf";
import "./Book.css";

function Book() {
  const sceneRef = useRef(null);
  const bookRef = useRef(null);
  const hintRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const cleanup = initBookAnimation({
      scene: sceneRef.current,
      book: bookRef.current,
      hint: hintRef.current,
    });

    const handleProgress = (e) => {
      if (!progressRef.current) return;

      const value = e.detail * 100;

      if (window.matchMedia("(max-width:768px)").matches) {
        // mobile horizontal
        progressRef.current.style.width = `${value}%`;
        progressRef.current.style.height = "100%";
      } else {
        // desktop vertical
        progressRef.current.style.height = `${value}%`;
        progressRef.current.style.width = "100%";
      }
    };

    window.addEventListener("bookProgress", handleProgress);

    return () => {
      cleanup?.();

      window.removeEventListener("bookProgress", handleProgress);
    };
  }, []);

  return (
    <>
      {/* Progress Bar */}
      <div className="progress">
        <span className="progress__bar" ref={progressRef} />
      </div>

      <div className="book-wrapper">
        <div className="scene" id="scene" ref={sceneRef}>
          <div className="book" id="book" ref={bookRef}>
            {/* =========================
                DESKTOP BOOK
            ========================== */}

            <div className="desktop-book">
              <Leaf index={0} front={<Home />} back={<About />} />

              <Leaf index={1} front={<Skills />} back={<Experience />} />

              <Leaf index={2} front={<Projects />} back={<Services />} />

              <Leaf index={3} front={<Awards />} back={<Testimonials />} />

              <Leaf index={4} front={<Contact />} back={<ThankYou />} />
            </div>

            {/* =========================
                MOBILE BOOK
            ========================== */}

            <div className="mobile-book">
              <div className="mobile-page">
                <Home />
              </div>

              <div className="mobile-page">
                <About />
              </div>

              <div className="mobile-page">
                <Skills />
              </div>

              <div className="mobile-page">
                <Experience />
              </div>

              <div className="mobile-page">
                <Projects />
              </div>

              <div className="mobile-page">
                <Services />
              </div>

              <div className="mobile-page">
                <Awards />
              </div>

              <div className="mobile-page">
                <Testimonials />
              </div>

              <div className="mobile-page">
                <Contact />
              </div>

              <div className="mobile-page">
                <ThankYou />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Book;
