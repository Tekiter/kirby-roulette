import { useCursor } from "@react-three/drei";
import { FC, ReactNode, useState } from "react";
import { motion } from "framer-motion-3d";

interface ButtonProps {
  position?: [number, number, number];
  children?: ReactNode | ((args: { isHovered: boolean }) => ReactNode);
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ position, children, onClick }) => {
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
      {typeof children === "function"
        ? children({ isHovered: hovered })
        : children}
    </mesh>
  );
};

export default Button;
