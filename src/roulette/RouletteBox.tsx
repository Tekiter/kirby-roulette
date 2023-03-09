import { RoundedBox } from "@react-three/drei";
import { FC } from "react";

interface RouletteBoxProps {}

const RouletteBox: FC<RouletteBoxProps> = ({}) => {
  return (
    <>
      <RoundedBox args={[7, 0.6, 2.5]} position={[0, -0.3, 0.25]} receiveShadow>
        <meshStandardMaterial roughness={1} opacity={1} color="#D6DBE0" />
      </RoundedBox>
      <RoundedBox args={[7, 10, 2]} position={[0, 1, -1.5]} receiveShadow>
        <meshStandardMaterial roughness={1} opacity={1} color="#D6DBE0" />
      </RoundedBox>
    </>
  );
};

export default RouletteBox;
