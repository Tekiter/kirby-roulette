import { useFrame } from "@react-three/fiber";
import { useAtomValue } from "jotai";
import { useRef } from "react";
import { Group } from "three";
import { entryList } from "../states";
import Button from "./Button";
import Spinner from "./Spinner";
import { useSpinner } from "./useSpinner";

export default function Board() {
  const items = useAtomValue(entryList);

  const spinnerRef = useRef<Group>(null);

  const { angleMotionValue, start } = useSpinner(items);

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
      <Button position={[2.5, 0.1, 2.5]} onClick={start} />
      <group ref={spinnerRef} position={[0, 0.1, 0]}>
        <Spinner items={items} />
      </group>
    </group>
  );
}
