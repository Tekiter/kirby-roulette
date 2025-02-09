import { Box, Environment, Lightformer } from "@react-three/drei";
import { useAtomValue } from "jotai";

import { isDebugAtom } from "./states/debug";

export default function Light() {
  const isDebug = useAtomValue(isDebugAtom);

  return (
    <>
      <ambientLight intensity={1.2} />;
      <directionalLight
        castShadow
        intensity={0.8}
        position={[5, 4, 5.5]}
        color="#fefefe"
      />
      {isDebug ? (
        <>
          <Box args={[1, 1, 1]} position={[10, 10, 10]}>
            <meshStandardMaterial roughness={1} opacity={1} color="#D6DBE0" />
          </Box>
        </>
      ) : null}
      <Environment resolution={32}>
        <Lightformer
          position={[10, 10, 10]}
          scale={10}
          intensity={10}
          color="white"
        />
        <Lightformer
          position={[10, 0, -10]}
          scale={10}
          intensity={6}
          color="red"
        />
        <Lightformer
          position={[-10, -10, -10]}
          scale={10}
          intensity={4}
          color="white"
        />
      </Environment>
    </>
  );
}
