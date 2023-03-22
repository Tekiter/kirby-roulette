import { MeshTransmissionMaterial, Text } from "@react-three/drei";
import { FC, useEffect } from "react";
import { motion } from "framer-motion-3d";
import { animate, useMotionValue } from "framer-motion";
import { FONT } from "./const";

interface ResultProps {
  content: string | null;
  position: [number, number, number];
}

const ResultBoard: FC<ResultProps> = ({ content, position }) => {
  const flipValue = useMotionValue(0);

  const disabled = content === null;

  useEffect(() => {
    animate(flipValue, disabled ? -Math.PI / 2 : 0, {
      duration: 0.5,
    });
  }, [disabled]);

  return (
    <motion.group position={position} rotation={[flipValue, 0, 0]}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 5.05]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[5, 0.6, 0.1]} />
        <MeshTransmissionMaterial
          resolution={128}
          samples={16}
          roughness={0.4}
          thickness={2}
          transmission={1}
          envMapIntensity={5}
          distortion={0}
          distortionScale={0.5}
          temporalDistortion={0}
          color={"#242424"}
        />
      </mesh>
      <Text
        castShadow
        receiveShadow
        font={FONT}
        color="#ffffff"
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
