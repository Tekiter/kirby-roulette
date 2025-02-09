import { useCursor } from "@react-three/drei";
import { noop } from "es-toolkit";
import { motion } from "framer-motion-3d";
import { FC, useEffect, useState } from "react";

import { usePreservedCallback } from "../utils/usePreservedCallback";

interface ButtonProps {
  position?: [number, number, number];
  color: string;
  hoverColor: string;
  onClick?: () => void;
}

const StartButton: FC<ButtonProps> = ({
  position,
  color,
  hoverColor,
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  useCursor(hovered, "pointer", "auto");

  const preservedOnClick = usePreservedCallback(onClick ?? noop);

  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName !== "INPUT" && e.key === " ") {
        preservedOnClick();

        setPressed(true);

        // eslint-disable-next-line @eslint-react/web-api/no-leaked-event-listener -- this handler will automatically be removed because of {once: true}
        document.addEventListener("keyup", () => setPressed(false), {
          once: true,
        });
      }
    };

    document.addEventListener("keydown", keydown);

    return () => {
      document.removeEventListener("keydown", keydown);
    };
  }, [preservedOnClick]);

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      onPointerOver={() => setHovered(true)}
      onPointerLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
    >
      <motion.mesh
        castShadow
        receiveShadow
        position={[0, 0.075, 0]}
        animate={{ y: pressed ? 0.055 : 0.075 }}
      >
        <cylinderGeometry args={[0.32, 0.35, 0.04]} />
        <motion.meshStandardMaterial
          initial={{ color: color }}
          animate={{ color: hovered ? hoverColor : color }}
        />
      </motion.mesh>
      <mesh castShadow position={[0, 0.025, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.05]} />
        <motion.meshStandardMaterial color="#6d6d6d" />
      </mesh>
    </group>
  );
};

export default StartButton;
