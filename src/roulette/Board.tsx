import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";
import Spinner from "./Spinner";
import { useSpinner } from "./useSpinner";

export default function Board() {
  const items = [
    { key: "0", content: "1" },
    { key: "1", content: "A" },
    { key: "2", content: "2" },
    { key: "3", content: "2" },
    { key: "4", content: "2" },
    { key: "5", content: "2" },
  ];

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
      <mesh castShadow position={[2.5, 0.1, 2.5]} onClick={start}>
        <boxGeometry args={[0.3, 0.1, 0.3]} />
        <meshBasicMaterial />
      </mesh>
      <group ref={spinnerRef} position={[0, 0.1, 0]}>
        <Spinner items={items} />
      </group>
    </group>
  );
}
