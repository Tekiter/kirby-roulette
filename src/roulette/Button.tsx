import { useCursor } from "@react-three/drei";
import { FC, useState } from "react";
import { motion } from "framer-motion-3d";

interface ButtonProps {
  position?: [number, number, number];
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ position, onClick }) => {
  const [hovered, setHovered] = useState(false);

  useCursor(hovered, "pointer", "auto");

  return (
    <mesh
      castShadow
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <boxGeometry args={[0.3, 0.1, 0.3]} />
      <motion.meshBasicMaterial
        animate={{ color: hovered ? "#000000" : "#ffffff" }}
      />
    </mesh>
  );
};

export default Button;
