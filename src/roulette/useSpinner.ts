import { useSpring } from "framer-motion";
import { MersenneTwister19937, real } from "random-js";
import { useEffect, useRef, useState } from "react";

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

  const angleMotionValue = useSpring(0, {
    duration: 6000,
    bounce: 0.1,
  });

  function start() {
    const newAngle = randomAngle();

    const lastAngle: number = angleMotionValue.get();

    angleMotionValue.jump(lastAngle - Math.PI * 2 * 5);
    angleMotionValue.set(newAngle);

    targetAngleRef.current = newAngle;
  }

  return {
    angleMotionValue,
    start,
  };
};
