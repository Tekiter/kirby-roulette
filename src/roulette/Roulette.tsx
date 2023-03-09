import { Canvas } from "@react-three/fiber";
import { FC } from "react";
import Spinner from "./Spinner";
import Camera from "./Camera";
import ItemList from "./ItemList";
import Light from "./Light";
import { OrbitControls } from "@react-three/drei";

interface RouletteProps {}

const Roulette: FC<RouletteProps> = ({}) => {
  return (
    <>
      <Canvas dpr={[1, 2]} camera={{ fov: 60, position: [0, 0, 3.5] }} shadows>
        <color attach="background" args={["#e0b7ff"]} />
        <Light />

        <Spinner />
        <Camera />
        <OrbitControls />
      </Canvas>
      <ItemList />
    </>
  );
};

export default Roulette;
