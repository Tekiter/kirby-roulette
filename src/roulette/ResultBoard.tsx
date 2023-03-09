import { Text } from "@react-three/drei";
import { FC } from "react";
import { motion } from "framer-motion-3d";

interface ResultProps {
  content: string | null;
  position: [number, number, number];
}

const ResultBoard: FC<ResultProps> = ({ content, position }) => {
  const disabled = content === null;

  return (
    <group position={position}>
      <mesh position={[0, 0, 0.05]}>
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
        position={[0, 0, 0.11]}
        fontSize={0.3}
        anchorX="center"
        anchorY="middle"
      >
        {content}
      </Text>
    </group>
  );
};

export default ResultBoard;
