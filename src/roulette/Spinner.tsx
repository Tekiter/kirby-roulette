import { useFrame } from "@react-three/fiber";
import { useAtomValue, useSetAtom } from "jotai";
import { useRef } from "react";
import { Group } from "three";
import { entryListAtom, modeAtom, targetItemAtom } from "./states";
import Button from "./Button";
import Disk from "./Disk";
import { useSpinner } from "./useSpinner";
import { RoundedBox, Text } from "@react-three/drei";

export default function Spinner() {
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
      <RoundedBox args={[7, 0.6, 2]} position={[0, -0.3, 0]} receiveShadow>
        <meshStandardMaterial roughness={1} opacity={1} color="#D6DBE0" />
      </RoundedBox>
      <RoundedBox args={[7, 10, 2]} position={[0, 1.5, -1.5]}>
        <meshStandardMaterial roughness={1} opacity={1} color="#D6DBE0" />
      </RoundedBox>

      <group
        ref={spinnerRef}
        position={[0, 2.7, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <Disk items={items} />
      </group>

      <Button
        position={[0.28, 0, 0.7]}
        color="#FF80A9"
        hoverColor="#e3e3e3"
        onClick={handleStart}
      />
      <Button
        position={[-0.28, 0, 0.7]}
        color="#8E59FF"
        hoverColor="#a47ff6"
        onClick={switchMode}
      />

      <Text
        castShadow
        receiveShadow
        font="https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/CookieRun-Regular.woff"
        color="black"
        rotation={[0, 0, 0]}
        position={[0, 5.5, 0.3]}
        fontSize={0.3}
        anchorX="center"
        anchorY="middle"
      >
        {targetItem?.content}
      </Text>
    </group>
  );
}
