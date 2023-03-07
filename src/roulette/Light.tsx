export default function Light() {
  return (
    <>
      <ambientLight />
      <directionalLight castShadow intensity={0.6} position={[0, 0, 10]} />
    </>
  );
}
