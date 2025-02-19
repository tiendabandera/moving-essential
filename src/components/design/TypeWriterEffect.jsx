import { useEffect, useState } from "react";

const TypeWriterEffect = ({ text, className, speed = 100 }) => {
  const [textDisplayed, setTextDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      setTextDisplayed(text.slice(0, index));

      if (!isDeleting && index < text.length) {
        setIndex((prev) => prev + 1);
      } else if (isDeleting && index > 0) {
        setIndex((prev) => prev - 1);
      } else if (index === text.length) {
        setTimeout(() => setIsDeleting(true), 1000); // Pausa antes de borrar
      } else if (index === 0 && isDeleting) {
        setIsDeleting(false);
      }
    };

    const typingInterval = setInterval(handleTyping, speed);

    return () => clearInterval(typingInterval);
  }, [index, isDeleting, text, speed]);

  return (
    <span className={`type-writer-effect ${className || ""}`}>
      {textDisplayed}
    </span>
  );
};

export default TypeWriterEffect;
