import { useFrame } from "@react-three/fiber";
import { useAtomValue } from "jotai";
import { useRef } from "react";
import { Group } from "three";
import { entryListAtom, targetItemAtom } from "./states";
import Button from "./Button";
import Spinner from "./Spinner";
import { useSpinner } from "./useSpinner";
import { Text } from "@react-three/drei";
import { motion } from "framer-motion-3d";

export default function Board() {
  const items = useAtomValue(entryListAtom);
  const spinnerRef = useRef<Group>(null);
  const { angleMotionValue, start } = useSpinner();
  const targetItem = useAtomValue(targetItemAtom);

  useFrame(() => {
    if (spinnerRef.current) {
      spinnerRef.current.rotation.y = -angleMotionValue.get();
    }
  });

  return (
    <group position={[0, 0, -1]} rotation={[Math.PI / 2, 0, 0]}>
      <mesh receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[6, 0.1, 6]} />
        <meshStandardMaterial
          roughness={1}
          transparent
          opacity={0.6}
          color="aquamarine"
        />
      </mesh>
      <Button position={[2.5, 0.1, 2.5]} onClick={start}>
        {({ isHovered }) => (
          <>
            <motion.meshBasicMaterial
              animate={{ color: isHovered ? "#e3e3e3" : "#ffffff" }}
            />
          </>
        )}
      </Button>
      <Button position={[2, 0.1, 2.5]} onClick={start}>
        {({ isHovered }) => (
          <motion.meshBasicMaterial
            animate={{ color: isHovered ? "#e3e3e3" : "#3eeeee" }}
          />
        )}
      </Button>
      <group ref={spinnerRef} position={[0, 0.1, 0]}>
        <Spinner items={items} />
      </group>
      <Text
        castShadow
        receiveShadow
        font="/SUIT-Medium.ttf"
        color="black"
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, -4]}
        fontSize={1}
        anchorX="center"
        anchorY="middle"
      >
        {targetItem?.content}
      </Text>
    </group>
  );
}
