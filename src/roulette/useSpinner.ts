import { animate, useMotionValue } from "framer-motion";
import { useAtom, useSetAtom } from "jotai";
import { MersenneTwister19937, real } from "random-js";
import { useEffect } from "react";

import { spinnerStateAtom, targetAngleAtom } from "./states/spinner";

const engine = MersenneTwister19937.autoSeed();

function randomAngle() {
  return real(0, 2 * Math.PI)(engine);
}

export const useSpinner = () => {
  const [targetAngle, setTargetAngle] = useAtom(targetAngleAtom);
  const setSpinnerState = useSetAtom(spinnerStateAtom);

  const value = useMotionValue(0);

  function start() {
    const newAngle = randomAngle();

    const lastAngle: number = value.get();

    value.jump(lastAngle - Math.PI * 2 * 10);

    animate(value, newAngle, {
      type: "tween",
      duration: 8,
      ease: [0.3, 0.99, 0.34, 1],
    });

    setSpinnerState("running");
    setTargetAngle(newAngle);
  }

  useEffect(() => {
    const release = value.on("animationComplete", () => {
      setSpinnerState("result");
    });

    return () => {
      release();
    };
  }, [setSpinnerState, value]);

  return {
    angleMotionValue: value,
    targetAngle,
    start,
  };
};
