import { useFrame } from "@react-three/fiber";
import { useAtomValue, useSetAtom } from "jotai";
import { useRef } from "react";
import { Group } from "three";
import { entryListAtom, modeAtom, targetItemAtom } from "./states";
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
  const setMode = useSetAtom(modeAtom);

  useFrame(() => {
    if (spinnerRef.current) {
      spinnerRef.current.rotation.y = -angleMotionValue.get();
    }
  });

  function switchMode() {
    setMode((prev) => {
      if (prev === "play") {
        return "edit";
      } else {
        return "play";
      }
    });
  }

  function handleStart() {
    start();
    setMode("play");
  }

  return (
    <group position={[0, 0, -1]}>
      <mesh receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[4, 0.1, 2]} />
        <meshStandardMaterial
          roughness={1}
          transparent
          opacity={0.6}
          color="#D6DBE0"
        />
      </mesh>
      <Button position={[-0.2, 0.1, 0.5]} onClick={switchMode}>
        {({ isHovered }) => (
          <>
            <motion.meshBasicMaterial
              animate={{ color: isHovered ? "#e3e3e3" : "#8E59FF" }}
            />
          </>
        )}
      </Button>
      <Button position={[0.2, 0.1, 0.5]} onClick={handleStart}>
        {({ isHovered }) => (
          <motion.meshBasicMaterial
            animate={{ color: isHovered ? "#e3e3e3" : "#FF80A9" }}
          />
        )}
      </Button>
      <group
        ref={spinnerRef}
        position={[0, 2.7, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
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
