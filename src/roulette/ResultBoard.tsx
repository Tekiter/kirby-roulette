import { RoundedBox, Text } from "@react-three/drei";
import { FC, useEffect } from "react";
import { motion } from "framer-motion-3d";
import { animate, useMotionValue } from "framer-motion";

interface ResultProps {
  content: string | null;
  position: [number, number, number];
}

const ResultBoard: FC<ResultProps> = ({ content, position }) => {
  const flipValue = useMotionValue(0);

  const disabled = content === null;

  useEffect(() => {
    animate(flipValue, disabled ? -Math.PI / 2 : 0);
  }, [disabled]);

  return (
    <motion.group position={position} rotation={[flipValue, 0, 0]}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 5.05]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[5, 0.6, 0.1]} />
        <motion.meshStandardMaterial
          animate={{ color: disabled ? "#c3c3c3" : "#68c393" }}
        />
      </mesh>
      <Text
        castShadow
        receiveShadow
        font="https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/CookieRun-Regular.woff"
        color="black"
        rotation={[0, 0, 0]}
        position={[0, 0.3, 0.06]}
        fontSize={0.3}
        anchorX="center"
        anchorY="middle"
      >
        {content}
      </Text>
    </motion.group>
  );
};

export default ResultBoard;
