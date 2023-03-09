import { Canvas } from "@react-three/fiber";
import { FC } from "react";
import Spinner from "./Spinner";
import Camera from "./Camera";
import ItemList from "./ItemList";
import Light from "./Light";
import { SoftShadows } from "@react-three/drei";

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
      </Canvas>
      <ItemList />
    </>
  );
};

export default Roulette;
