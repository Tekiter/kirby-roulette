import { Text } from "@react-three/drei";
import { FC } from "react";

interface DiskProps {
  items: { key: string; content: string }[];
}

const colors: string[] = [
  "#3843D0",
  "#FFAF5A",
  "#4AD1AC",
  "#FD5860",
  "#63E2FB",
  "#FF8C76",
  "#EC3843",
  "#6D6EF0",
  "#1A9A7C",
];

const Disk: FC<DiskProps> = ({ items }) => {
  return (
    <>
      <mesh castShadow receiveShadow position={[0, -0.4, 0]}>
        <cylinderGeometry args={[2.77, 2.7, 0.5, 64]} />
        <meshStandardMaterial roughness={1} color="#E6E5ED" />
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
                  0.3,
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
              maxWidth={4}
              font="https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/CookieRun-Regular.woff"
              color="#fbfbfb"
              rotation={[-Math.PI / 2, 0, angle / 2 + Math.PI]}
              position={[2 * Math.sin(angle / 2), 0.2, 2 * Math.cos(angle / 2)]}
              fontSize={0.185}
              anchorX="center"
              anchorY="middle"
              textAlign="center"
            >
              {item.content}
            </Text>
          </group>
        );
      })}
    </>
  );
};

export default Disk;
