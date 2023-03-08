export default function Light() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight castShadow intensity={0.3} position={[0, 10, 10]} />
    </>
  );
}
