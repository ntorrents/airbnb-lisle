import { useEffect, useRef, useState } from "react";
import "./SectionReveal.css";

/** Soft fade-up on scroll. Hero keeps the shutter animation. */
const SectionReveal = ({ children, className = "", id }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`reveal ${visible ? "reveal--in" : ""} ${className}`.trim()}
    >
      {children}
    </section>
  );
};

export default SectionReveal;
