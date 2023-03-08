import { animate, useMotionValue } from "framer-motion";
import { useAtom } from "jotai";
import { MersenneTwister19937, real } from "random-js";
import { targetAngleAtom } from "./states";

const engine = MersenneTwister19937.autoSeed();

function randomAngle() {
  return real(0, 2 * Math.PI)(engine);
}

export const useSpinner = () => {
  const [targetAngle, setTargetAngle] = useAtom(targetAngleAtom);

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

    setTargetAngle(newAngle);
  }

  return {
    angleMotionValue: value,
    targetAngle,
    start,
  };
};
