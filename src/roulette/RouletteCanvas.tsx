import { Canvas } from "@react-three/fiber";
import { FC } from "react";
import Spinner from "./Spinner";
import Camera from "./Camera";
import Light from "./Light";
import { OrbitControls, SoftShadows } from "@react-three/drei";
import { useAtom } from "jotai";
import { isDebugAtom } from "./states/debug";

interface RouletteProps {}

const RouletteCanvas: FC<RouletteProps> = () => {
  const [isDebug, setIsDebug] = useAtom(isDebugAtom);

  return (
    <>
      <div className="h-full">
        <Canvas
          dpr={[1, 2]}
          camera={{ fov: 60, position: [100, 90, 0] }}
          shadows
        >
          <SoftShadows />
          <Light />

          <Spinner />
          <Camera />

          <OrbitControls
            makeDefault
            {...(isDebug
              ? {}
              : {
                  minAzimuthAngle: -Math.PI / 3,
                  maxAzimuthAngle: Math.PI / 4,
                  minPolarAngle: Math.PI / 4,
                  maxPolarAngle: Math.PI / 2,
                  minDistance: 4,
                  maxDistance: 10,
                })}
          />
        </Canvas>
      </div>
      {import.meta.env.DEV ? (
        <button
          className="absolute left-0 bottom-0"
          onClick={() => {
            setIsDebug((debug) => !debug);
            location.reload();
          }}
        >
          DEBUG {isDebug ? "ON" : "OFF"}
        </button>
      ) : null}
    </>
  );
};

export default RouletteCanvas;
