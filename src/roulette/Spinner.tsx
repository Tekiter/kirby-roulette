import { useFrame } from "@react-three/fiber";
import { useAtomValue, useSetAtom } from "jotai";
import { useRef } from "react";
import { Group } from "three";
import {
  entryListAtom,
  cameraStateAtom,
  targetItemAtom,
  spinnerStateAtom,
} from "./states";
import Button from "./Button";
import Disk from "./Disk";
import { useSpinner } from "./useSpinner";
import ResultBoard from "./ResultBoard";
import RouletteBox from "./RouletteBox";

export default function Spinner() {
  const items = useAtomValue(entryListAtom);
  const spinnerRef = useRef<Group>(null);
  const { angleMotionValue, start } = useSpinner();
  const setMode = useSetAtom(cameraStateAtom);
  const targetItem = useAtomValue(targetItemAtom);
  const spinnerState = useAtomValue(spinnerStateAtom);

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
    if (spinnerState === "running") {
      return;
    }
    start();
    setMode("play");
  }

  return (
    <group position={[0, 0, -1]}>
      <RouletteBox />

      <group
        ref={spinnerRef}
        position={[0, 2.8, -0.2]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <Disk items={items} />
      </group>

      <mesh position={[0, 5.5, -0.15]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.05, 3]} />
        <meshStandardMaterial color="#EC3843" />
      </mesh>

      <Button
        position={[0, 0, 0.7]}
        color="#FF80A9"
        hoverColor="#ffa4c1"
        onClick={handleStart}
      />
      <Button
        position={[2.5, 0, 0.7]}
        color="#8E59FF"
        hoverColor="#a47ff6"
        onClick={switchMode}
      />
      <ResultBoard
        position={[0, 6, -0.5]}
        content={spinnerState === "result" ? targetItem?.content ?? null : null}
      />
    </group>
  );
}
