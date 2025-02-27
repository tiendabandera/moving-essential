import clsx from "clsx";
import { motion } from "framer-motion";

const BentoCard = ({
  dark = false,
  className = "",
  title,
  description,
  graphic,
  fade = [],
}) => {
  return (
    <motion.div
      initial="idle"
      whileHover="active"
      variants={{ idle: {}, active: {} }}
      data-dark={dark ? "true" : undefined}
      className={clsx(
        className,
        "group relative flex flex-col overflow-hidden rounded-lg",
        "bg-white ring-1 shadow-sm ring-black/5",
        "data-dark:bg-gray-800 data-dark:ring-white/15"
      )}
    >
      <div className="relative h-80 shrink-0">
        {graphic}
        {fade.includes("top") && (
          <div className="absolute inset-0 bg-linear-to-b from-white to-50% group-data-dark:from-gray-800 group-data-dark:from-[-25%]" />
        )}
        {fade.includes("bottom") && (
          <div className="absolute inset-0 bg-linear-to-t from-white to-30% group-data-dark:from-gray-800 group-data-dark:from-[-25%]" />
        )}
      </div>
      <div className="relative p-10">
        <h4 className="mt-1 text-2xl/8 font-semibold tracking-tight text-gray-950 group-data-dark:text-white">
          {title}
        </h4>
        <p className="mt-2 max-w-[600px] text-sm/6 text-gray-600 group-data-dark:text-gray-400">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default BentoCard;
