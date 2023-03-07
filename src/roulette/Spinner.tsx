import { Text } from "@react-three/drei";
import { FC } from "react";

interface SpinnerProps {
  items: { key: string; content: string }[];
}

const colors: string[] = [
  "#F0A3FF",
  "#0075DC",
  "#993F00",
  "#4C005C",
  "#2BCE48",
  "#FFCC99",
  "#808080",
  "#94FFB5",
  "#8F7C00",
  "#FFA07A",
];

const Spinner: FC<SpinnerProps> = ({ items }) => {
  return (
    <>
      <mesh castShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[2.6, 2.6, 0.1, 64]} />
        <meshStandardMaterial
          roughness={1}
          transparent
          opacity={0.8}
          color="green"
        />
      </mesh>
      {items.map((item, idx) => (
        <group
          key={item.key}
          position={[0, 0.1, 0]}
          rotation={[0, ((2 * Math.PI) / items.length) * idx, 0]}
        >
          <mesh>
            <cylinderGeometry
              args={[
                2.5,
                2.5,
                0.1,
                64,
                undefined,
                undefined,
                undefined,
                (2 * Math.PI) / items.length,
              ]}
            />
            <meshStandardMaterial
              roughness={1}
              transparent
              opacity={0.8}
              color={colors[idx % colors.length]}
            />
          </mesh>
          <Text
            font="/SUIT-Medium.ttf"
            color="black"
            rotation={[-Math.PI / 2, 0, -(2 * Math.PI * 2) / items.length]}
            position={[
              2 * Math.sin((2 * Math.PI) / items.length / 2),
              0.2,
              2 * Math.cos((2 * Math.PI) / items.length / 2),
            ]}
            fontSize={0.4}
            anchorX="center"
            anchorY="middle"
          >
            {item.content}
          </Text>
        </group>
      ))}
    </>
  );
};

export default Spinner;
