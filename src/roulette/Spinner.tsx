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
import StartButton from "./StartButton";
import Disk from "./Disk";
import { useSpinner } from "./useSpinner";
import ResultBoard from "./ResultBoard";
import RouletteBox from "./RouletteBox";
import EditButton from "./EditButton";
import useEventLogger from "../eventLogger/useEventLogger";
import { usePreservedCallback } from "../utils/usePreservedCallback";

export default function Spinner() {
  const { logEvent } = useEventLogger();
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

  const handleStart = usePreservedCallback(() => {
    if (spinnerState === "running") {
      return;
    }
    start();
    setMode("play");
    logEvent("Action-SpinRoulette");
  });

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

      <StartButton
        position={[0, 0, 0.7]}
        color="#FF80A9"
        hoverColor="#ffa4c1"
        onClick={handleStart}
      />

      <EditButton position={[2.9, 5.4, -0.5]} />
      <ResultBoard
        position={[0, 6, -0.5]}
        content={spinnerState === "result" ? targetItem?.content ?? null : null}
      />
    </group>
  );
}
