import { Canvas } from "@react-three/fiber";
import { FC } from "react";
import Spinner from "./Spinner";
import Camera from "./Camera";
import ItemList from "./ItemList";
import Light from "./Light";
import { OrbitControls, SoftShadows } from "@react-three/drei";
import MobileButtons from "./MobileButtons";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

interface RouletteProps {}

const Roulette: FC<RouletteProps> = ({}) => {
  return (
    <>
      <Canvas dpr={[1, 2]} camera={{ fov: 60, position: [0, 6, 6] }} shadows>
        <color attach="background" args={["#e0b7ff"]} />
        <SoftShadows />
        <Light />

        <Spinner />
        <Camera />

        {import.meta.env.DEV && <OrbitControls />}

        <EffectComposer>
          <Bloom luminanceThreshold={1} intensity={2} levels={9} mipmapBlur />
        </EffectComposer>
      </Canvas>
      <ItemList />
      <MobileButtons />
    </>
  );
};

export default Roulette;
