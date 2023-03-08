import { Text } from "@react-three/drei";
import { FC } from "react";

interface SpinnerProps {
  items: { key: string; content: string }[];
}

const colors: string[] = [
  "#EC3843",
  "#FD5860",
  "#FF8C76",
  "#4AD1AC",
  "#1A9A7C",
  "#6D6EF0",
  "#1739DC",
  "#DEC3C1",
  "#FFAF5A",
  "#92D8E6",
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
          color="#E6E5ED"
        />
      </mesh>
      {items.map((item, idx) => {
        const angle = (2 * Math.PI) / items.length;

        return (
          <group
            key={item.key}
            position={[0, 0.1, 0]}
            rotation={[0, angle * idx + Math.PI, 0]}
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
              color="#0D0040"
              rotation={[-Math.PI / 2, 0, angle / 2 + Math.PI]}
              position={[
                2 * Math.sin(angle / 2),
                0.15,
                2 * Math.cos(angle / 2),
              ]}
              fontSize={0.2}
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
