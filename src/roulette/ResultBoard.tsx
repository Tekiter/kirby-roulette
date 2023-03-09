import { Text } from "@react-three/drei";
import { FC } from "react";

interface ResultProps {
  content: string;
  position: [number, number, number];
}

const ResultBoard: FC<ResultProps> = ({ content, position }) => {
  return (
    <group position={position}>
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[3, 0.6, 0.1]} />
        <meshStandardMaterial color="green" />
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
