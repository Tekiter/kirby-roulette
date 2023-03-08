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
      {items.map((item, idx) => {
        const angle = (2 * Math.PI) / items.length;

        return (
          <group
            key={item.key}
            position={[0, 0.1, 0]}
            rotation={[0, angle * idx, 0]}
          >
            <mesh receiveShadow>
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
                opacity={1}
                color={colors[idx % colors.length]}
              />
            </mesh>
            <Text
              castShadow
              receiveShadow
              font="/SUIT-Medium.ttf"
              color="black"
              rotation={[-Math.PI / 2, 0, angle / 2 + Math.PI]}
              position={[2 * Math.sin(angle / 2), 0.2, 2 * Math.cos(angle / 2)]}
              fontSize={0.4}
              anchorX="center"
              anchorY="middle"
            >
              {item.content}
            </Text>
          </group>
        );
      })}
    </>
  );
};

export default Spinner;
