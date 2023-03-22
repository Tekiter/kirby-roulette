import { Environment, Lightformer } from "@react-three/drei";

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
        <Lightformer position={[10, 10, 10]} scale={10} intensity={4} />
        <Lightformer
          position={[10, 0, -10]}
          scale={10}
          color="red"
          intensity={6}
        />
        <Lightformer position={[-10, -10, -10]} scale={10} intensity={4} />
      </Environment>
    </>
  );
}
