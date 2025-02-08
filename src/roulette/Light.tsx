import { Box, Environment, Lightformer } from "@react-three/drei";

export default function Light() {
  return (
    <>
      <ambientLight intensity={0.5} />;
      <directionalLight
        castShadow
        intensity={0.8}
        position={[5, 4, 5.5]}
        color="#fefefe"
      />
      <Environment resolution={32}>
        <Box args={[1, 1, 1]} position={[10, 10, 10]} />
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
