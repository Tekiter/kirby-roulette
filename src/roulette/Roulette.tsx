import { Canvas } from "@react-three/fiber";
import { FC } from "react";
import Board from "./Board";
import Camera from "./Camera";
import ItemList from "./ItemList";
import Light from "./Light";

interface RouletteProps {}

const Roulette: FC<RouletteProps> = ({}) => {
  return (
    <>
      <Canvas dpr={[1, 2]} camera={{ fov: 60, position: [0, 0, 3.5] }} shadows>
        <color attach="background" args={["#e0b7ff"]} />
        <Light />

        <Board />
        <Camera />
      </Canvas>
      <ItemList />
    </>
  );
};

export default Roulette;
