import { RoundedBox, Text } from "@react-three/drei";
import { FC } from "react";
import { FONT } from "./const";

interface RouletteBoxProps {}

const RouletteBox: FC<RouletteBoxProps> = ({}) => {
  return (
    <group>
      <RoundedBox args={[7, 0.6, 2.5]} position={[0, -0.3, 0.25]} receiveShadow>
        <meshStandardMaterial roughness={1} opacity={1} color="#D6DBE0" />
      </RoundedBox>
      <RoundedBox args={[7, 10, 2]} position={[0, 1, -1.5]} receiveShadow>
        <meshStandardMaterial roughness={1} opacity={1} color="#D6DBE0" />
      </RoundedBox>
      <Text
        castShadow
        receiveShadow
        font={FONT}
        color="#4e4e4e"
        rotation={[0, 0, 0]}
        position={[-3.25, 5.8, -0.4]}
        fontSize={0.2}
        anchorX="left"
        anchorY="top"
      >
        Kirby Roulette
      </Text>
    </group>
  );
};

export default RouletteBox;
