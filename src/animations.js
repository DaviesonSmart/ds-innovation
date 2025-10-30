// src/animations.js

// For use with variants (like in Hero)
export const fadeInUp = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

// Other animation exports
export const fadeUp = {
  initial: { opacity: 0, y: 80 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: "easeOut" },
};

export const fadeRight = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 1, delay: 0.5, ease: "easeOut" },
};

export const fadeLeft = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 1, delay: 0.9, ease: "easeOut" },
};

export const fadeDown = {
  initial: { opacity: 0, y: -80 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay: 1.3, ease: "easeOut" },
};
