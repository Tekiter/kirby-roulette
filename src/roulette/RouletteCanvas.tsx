import { Canvas } from "@react-three/fiber";
import { FC } from "react";
import Spinner from "./Spinner";
import Camera from "./Camera";
import Light from "./Light";
import { OrbitControls, SoftShadows } from "@react-three/drei";

interface RouletteProps {}

const RouletteCanvas: FC<RouletteProps> = ({}) => {
  return (
    <>
      <div className="h-full">
        <Canvas
          dpr={[1, 2]}
          camera={{ fov: 60, position: [100, 90, 0] }}
          shadows
        >
          <color attach="background" args={["#e0b7ff"]} />
          <SoftShadows />
          <Light />

          <Spinner />
          <Camera />

          <OrbitControls
            makeDefault
            minAzimuthAngle={-Math.PI / 3}
            maxAzimuthAngle={Math.PI / 4}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            minDistance={4}
            maxDistance={10}
          />
        </Canvas>
      </div>
    </>
  );
};

export default RouletteCanvas;
