import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function initBookAnimation({ scene, book, hint }) {
  const isMobile = window.matchMedia("(max-width:768px)").matches;

  if (isMobile) {
    return initMobileBook(scene, book, hint);
  }

  return initDesktopBook(scene, book, hint);
}

/* =====================================================
   DESKTOP BOOK ANIMATION
===================================================== */

function initDesktopBook(scene, book, hint) {
  const leaves = [...book.querySelectorAll(".leaf")];

  if (!leaves.length) return;

  const N = leaves.length;

  const clamp = (value) => Math.max(0, Math.min(1, value));

  leaves.forEach((leaf, index) => {
    gsap.set(leaf, {
      rotationY: 0,
      transformOrigin: "left center",
      transformStyle: "preserve-3d",
      zIndex: N - index + 20,
    });

    if (!leaf.querySelector(".leaf__shade")) {
      const shade = document.createElement("div");

      shade.className = "leaf__shade";

      leaf.appendChild(shade);
    }
  });

  function applyFlip(progress) {
    for (let i = 0; i < N; i++) {
      const leaf = leaves[i];

      const start = i / N;

      const end = (i + 1) / N;

      const local = clamp((progress - start) / (end - start));

      gsap.set(leaf, {
        rotateY: -180 * local,
      });

      if (local <= 0) {
        leaf.style.zIndex = N - i + 20;
      } else if (local >= 1) {
        leaf.style.zIndex = i;
      } else {
        leaf.style.zIndex = 100;
      }
    }
  }

  const trigger = ScrollTrigger.create({
    trigger: scene,

    start: "top top",

    end: `+=${(N + 0.5) * window.innerHeight}`,

    pin: true,

    scrub: 0.1,

    onUpdate(self) {
      // Book flip
      applyFlip(self.progress);

      // Progress bar update
      window.dispatchEvent(
        new CustomEvent("bookProgress", {
          detail: self.progress,
        }),
      );

      // Hide hint
      if (hint) {
        hint.style.opacity = self.progress > 0.02 ? "0" : "1";
      }

      // Current page
      const totalPages = N * 2;

      const currentPage = Math.min(
        totalPages - 1,
        Math.floor(self.progress * totalPages),
      );

      window.dispatchEvent(
        new CustomEvent("bookPageChange", {
          detail: currentPage,
        }),
      );
    },
  });

  return () => {
    trigger.kill();
  };
}

/* =====================================================
   MOBILE BOOK ANIMATION
===================================================== */

function initMobileBook(scene, book, hint) {
  const pages = [...book.querySelectorAll(".mobile-page")];

  if (!pages.length) return;

  const total = pages.length;

  pages.forEach((page, index) => {
    gsap.set(page, {
      opacity: index === 0 ? 1 : 0,

      xPercent: index === 0 ? 0 : 100,

      zIndex: total - index,

      position: "absolute",

      inset: 0,
    });
  });

  let activePage = -1;

  function updatePages(progress) {
    const current = Math.min(total - 1, Math.round(progress * (total - 1)));

    if (current === activePage) return;

    activePage = current;

    pages.forEach((page, index) => {
      if (index === current) {
        gsap.to(page, {
          opacity: 1,

          xPercent: 0,

          scale: 1,

          duration: 0.35,

          ease: "power3.out",

          overwrite: true,

          zIndex: 10,
        });
      } else if (index < current) {
        gsap.to(page, {
          opacity: 0,

          xPercent: -100,

          scale: 0.96,

          duration: 0.35,

          ease: "power2.out",

          overwrite: true,

          zIndex: 1,
        });
      } else {
        gsap.to(page, {
          opacity: 0,

          xPercent: 100,

          scale: 0.96,

          duration: 0.35,

          ease: "power2.out",

          overwrite: true,

          zIndex: 1,
        });
      }
    });

    window.dispatchEvent(
      new CustomEvent("bookPageChange", {
        detail: current,
      }),
    );
  }

  const trigger = ScrollTrigger.create({
    trigger: scene,

    start: "top top",

    end: `+=${total * window.innerHeight}`,

    pin: true,

    scrub: 0.25,

    onUpdate(self) {
      updatePages(self.progress);

      // Progress bar update
      window.dispatchEvent(
        new CustomEvent("bookProgress", {
          detail: self.progress,
        }),
      );

      if (hint) {
        hint.style.opacity = self.progress > 0.02 ? "0" : "1";
      }
    },
  });

  window.bookTrigger = trigger;

  return () => {
    trigger.kill();
  };
}
