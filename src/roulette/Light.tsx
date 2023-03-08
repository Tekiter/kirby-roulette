export default function Light() {
  return (
    <>
      <ambientLight intensity={0.7} />;
      <directionalLight
        castShadow
        intensity={0.8}
        position={[5, 4, 5.5]}
        color="#fefefe"
      />
    </>
  );
}
