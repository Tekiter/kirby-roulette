import { useCursor } from "@react-three/drei";
import { FC, useState } from "react";
import { motion } from "framer-motion-3d";

interface ButtonProps {
  position?: [number, number, number];
  color: string;
  hoverColor: string;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ position, color, hoverColor, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  useCursor(hovered, "pointer", "auto");

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
      <mesh castShadow>
        <cylinderGeometry args={[0.23, 0.23, 0.05]} />

        <motion.meshStandardMaterial
          animate={{ color: hovered ? hoverColor : color }}
        />
      </mesh>
      <motion.mesh
        castShadow
        receiveShadow
        position={[0, 0.05, 0]}
        animate={{ y: pressed ? 0.03 : 0.05 }}
      >
        <cylinderGeometry args={[0.18, 0.2, 0.04]} />
        <motion.meshStandardMaterial
          animate={{ color: hovered ? hoverColor : color }}
        />
      </motion.mesh>
    </group>
  );
};

export default Button;
