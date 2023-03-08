import { animate, useMotionValue } from "framer-motion";
import { MersenneTwister19937, real } from "random-js";
import { useRef } from "react";

const engine = MersenneTwister19937.autoSeed();

function randomAngle() {
  return real(0, 2 * Math.PI)(engine);
}

interface ItemEntry {
  key: string;
  content: string;
}

export const useSpinner = (items: ItemEntry[]) => {
  const targetAngleRef = useRef(0);

  const value = useMotionValue(0);

  function start() {
    const newAngle = randomAngle();

    const lastAngle: number = value.get();

    value.jump(lastAngle - Math.PI * 2 * 5);

    animate(value, newAngle, {
      type: "tween",
      duration: 5,
      ease: [0.3, 0.99, 0.34, 1],
    });

    targetAngleRef.current = newAngle;
  }

  return {
    angleMotionValue: value,
    start,
  };
};
