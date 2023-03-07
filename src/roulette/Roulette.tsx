import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { FC } from "react";
import Board from "./Board";
import ItemList from "./ItemList";
import Light from "./Light";

interface RouletteProps {}

const Roulette: FC<RouletteProps> = ({}) => {
  return (
    <>
      <Canvas camera={{ fov: 90, position: [0, 0, 3.5] }}>
        <color attach="background" args={["#fef4ef"]} />
        <Light />

        <Board />

        <axesHelper />

        <OrbitControls />
      </Canvas>
      <ItemList />
    </>
  );
};

export default Roulette;
