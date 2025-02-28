import { clsx } from "clsx";
import { motion } from "framer-motion";

function Circle({ size, delay, opacity }) {
  return (
    <motion.div
      variants={{
        idle: { width: `${size}px`, height: `${size}px` },
        active: {
          width: [`${size}px`, `${size + 10}px`, `${size}px`],
          height: [`${size}px`, `${size + 10}px`, `${size}px`],
          transition: {
            duration: 0.75,
            repeat: Infinity,
            repeatDelay: 1.25,
            ease: "easeInOut",
            delay,
          },
        },
      }}
      style={{ "--opacity": opacity }}
      className={clsx(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full",
        "bg-[radial-gradient(circle,transparent_25%,color-mix(in_srgb,var(--color-blue-500)_var(--opacity),transparent)_100%)]",
        "ring-1 ring-blue-500/[8%] ring-inset"
      )}
    />
  );
}

function Circles() {
  return (
    <div className="absolute inset-0">
      <Circle size={528} opacity="3%" delay={0.45} />
      <Circle size={400} opacity="5%" delay={0.3} />
      <Circle size={272} opacity="5%" delay={0.15} />
      <Circle size={144} opacity="10%" delay={0} />
      <div className="absolute inset-0 bg-linear-to-t from-white to-35%" />
    </div>
  );
}

function MainLogo() {
  return (
    <div className="absolute top-32 left-44 flex size-16 items-center justify-center rounded-full bg-white ring-1 shadow-sm ring-black/5">
      <img
        className="size-10"
        src="/assets/img/logo.png"
        alt="Moving Essential"
      />
    </div>
  );
}

function Logo({ src, left, top, hover }) {
  /* return (
    <motion.img
      variants={{
        idle: { x: 0, y: 0, rotate: 0 },
        active: {
          x: [0, hover.x, 0],
          y: [0, hover.y, 0],
          rotate: [0, hover.rotate, 0],
          transition: {
            duration: 0.75,
            repeat: Infinity,
            repeatDelay: 1.25,
            ease: "easeInOut",
            delay: hover.delay,
          },
        },
      }}
      alt=""
      src={src}
      style={{ left, top }}
      className="absolute size-16 rounded-full bg-white ring-1 shadow-sm ring-black/5"
    />
  ); */

  return (
    <motion.div
      variants={{
        idle: { x: 0, y: 0, rotate: 0 },
        active: {
          x: [0, hover.x, 0],
          y: [0, hover.y, 0],
          rotate: [0, hover.rotate, 0],
          transition: {
            duration: 0.75,
            repeat: Infinity,
            repeatDelay: 1.25,
            ease: "easeInOut",
            delay: hover.delay,
          },
        },
      }}
      alt=""
      style={{ left, top }}
      className="flex items-center justify-center absolute size-16 rounded-full bg-white ring-1 shadow-sm ring-black/5"
    >
      <img className="size-10" src={src} alt="" />
    </motion.div>
  );
}

export function LogoCluster() {
  return (
    <div aria-hidden="true" className="relative h-full overflow-hidden">
      <Circles />
      <div className="absolute left-1/2 h-full w-[26rem] -translate-x-1/2">
        <MainLogo />
        <Logo
          src="/assets/img/vision.png"
          left={360}
          top={144}
          hover={{ x: 6, y: 1, rotate: 5, delay: 0.38 }}
        />
        <Logo
          src="/assets/img/values.png"
          left={285}
          top={20}
          hover={{ x: 4, y: -5, rotate: 6, delay: 0.3 }}
        />
        <Logo
          src="/assets/img/purpose.png"
          left={205}
          top={220}
          hover={{ x: 3, y: 5, rotate: 7, delay: 0.2 }}
        />
        <Logo
          src="/assets/img/position.png"
          left={144}
          top={40}
          hover={{ x: -2, y: -5, rotate: -6, delay: 0.15 }}
        />
        <Logo
          src="/assets/img/cerebro.png"
          left={36}
          top={150}
          hover={{ x: -4, y: -5, rotate: -6, delay: 0.35 }}
        />
        {/* <Logo
          src="/logo-cluster/we-work-remotely.svg"
          left={96}
          top={176}
          hover={{ x: -3, y: 5, rotate: 3, delay: 0.15 }}
        /> */}
      </div>
    </div>
  );
}
