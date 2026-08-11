import React, { useEffect, useRef, useState } from "react";
import { motion, animate } from "framer-motion";

function AnimatedNumber({ target, suffix = "", start }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Reset number when leaving Awards
    if (!start) {
      setCount(0);
      return;
    }

    // Start animation
    const controls = animate(0, target, {
      duration: 1.2,
      ease: "easeOut",

      onUpdate: (value) => {
        setCount(Math.floor(value));
      },

      onComplete: () => {
        setCount(target);
      },
    });

    // Stop animation if component changes/unmounts
    return () => {
      controls.stop();
    };
  }, [start, target]);

  return (
    <motion.b
      initial={{ opacity: 0 }}
      animate={{ opacity: start ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {count}
      {suffix}
    </motion.b>
  );
}

function Awards() {
  const [showNumbers, setShowNumbers] = useState(false);
  const wasInside = useRef(false);

  useEffect(() => {
    const handleBookProgress = (e) => {
      const progress = e.detail;

      /*
        Your book pages:

        1. Home
        2. About
        3. Skills
        4. Experience
        5. Projects
        6. Services
        7. Awards
        8. Testimonials
        9. Contact
        10. Thank You
      */

      const isAwardsPage = progress >= 0.58 && progress <= 0.72;

      // Enter Awards
      if (isAwardsPage && !wasInside.current) {
        wasInside.current = true;
        setShowNumbers(true);
      }

      // Leave Awards
      if (!isAwardsPage && wasInside.current) {
        wasInside.current = false;
        setShowNumbers(false);
      }
    };

    window.addEventListener("bookProgress", handleBookProgress);

    return () => {
      window.removeEventListener("bookProgress", handleBookProgress);
    };
  }, []);

  const stats = [
    {
      number: 15,
      suffix: "+",
      label: "Web Projects",
    },
    {
      number: 3,
      suffix: "+",
      label: "Years Experience",
    },
    {
      number: 100,
      suffix: "%",
      label: "Client Focus",
    },
    {
      number: 24,
      suffix: "/7",
      label: "Support",
    },
  ];

  const awards = [
    "Responsive Web Development",
    "SEO Optimized Websites",
    "Fast Performance Websites",
  ];

  return (
    <section className="face face--awards">
      <p className="kicker">Awards & Achivements — 6</p>

      <h1 className="face__title">Numbers Matter</h1>

      <div className="stats">
        {stats.map((item, index) => (
          <motion.div
            className="stat"
            key={index}
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={
              showNumbers
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 15,
                  }
            }
            transition={{
              duration: 0.5,
              delay: index * 0.12,
              ease: "easeOut",
            }}
          >
            <AnimatedNumber
              target={item.number}
              suffix={item.suffix}
              start={showNumbers}
            />

            <span>{item.label}</span>
          </motion.div>
        ))}
      </div>

      <ul className="awards">
        {awards.map((award, index) => (
          <motion.li key={index} animate={showNumbers}>
            {award}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

export default Awards;
