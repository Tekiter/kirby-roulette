import { Text } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { FC, Suspense } from "react";

import { FONT } from "./const";

interface DiskProps {
  items: { key: string; content: string }[];
}

const colors: string[] = [
  "#3843D0",
  "#d48530",
  "#2da887",
  "#cd474d",
  "#2a98ae",
  "#cc614b",
  "#EC3843",
  "#6D6EF0",
  "#1A9A7C",
];

const DISK_RADIUS = 2.5;

const Disk: FC<DiskProps> = ({ items }) => {
  return (
    <>
      <mesh castShadow receiveShadow position={[0, -0.1, 0]}>
        <cylinderGeometry
          args={[DISK_RADIUS + 0.2, DISK_RADIUS + 0.2, 0.2, 64]}
        />
        <meshStandardMaterial roughness={1} color="#d1c6d8" />
      </mesh>
      {items.map((item, idx) => {
        const angle = (2 * Math.PI) / items.length;

        return (
          <group
            key={item.key}
            position={[0, 0.1, 0]}
            rotation={[0, angle * idx + Math.PI, 0]}
          >
            <mesh receiveShadow castShadow>
              <motion.cylinderGeometry
                args={[
                  DISK_RADIUS,
                  DISK_RADIUS,
                  0.1,
                  64,
                  undefined,
                  undefined,
                  undefined,
                  (2 * Math.PI) / items.length,
                ]}
              />
              <meshPhongMaterial color={colors[idx % colors.length]} />
            </mesh>
            <Suspense>
              <Text
                maxWidth={Math.min(angle * 1.5, 2)}
                lineHeight={1}
                overflowWrap={"break-word"}
                font={FONT}
                color="#fefefe"
                rotation={[-Math.PI / 2, 0, angle / 2 + Math.PI]}
                position={[
                  2 * Math.sin(angle / 2),
                  0.155,
                  2 * Math.cos(angle / 2),
                ]}
                fontSize={0.185}
                anchorX="center"
                anchorY="middle"
                textAlign="center"
              >
                {item.content}
              </Text>
            </Suspense>
            <mesh position={[0, 0, DISK_RADIUS - 0.01]} castShadow>
              <capsuleGeometry args={[0.03, 0.2]} />
              <meshStandardMaterial color="#acacac" />
            </mesh>
          </group>
        );
      })}
      <mesh position={[0, 0.09, 0]} castShadow>
        <capsuleGeometry args={[0.07, 0.2]} />
        <meshStandardMaterial color="#dddddd" />
      </mesh>
    </>
  );
};

export default Disk;
