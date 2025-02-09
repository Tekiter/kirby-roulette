import { Center, Svg, useCursor } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useAtom } from "jotai";
import { FC, useState } from "react";
import { MeshBasicMaterial } from "three";

import useEventLogger from "../eventLogger/useEventLogger";
import { cameraStateAtom } from "./states/spinner";

interface EditButtonProps {
  position: [number, number, number];
}

const basic = new MeshBasicMaterial({ color: "#141414" });

const EditButton: FC<EditButtonProps> = ({ position }) => {
  const { logEvent } = useEventLogger();
  const [hover, setHover] = useState(false);
  const [cameraState, setCameraState] = useAtom(cameraStateAtom);

  useCursor(hover);

  function handleClick() {
    if (cameraState === "play") {
      setCameraState("edit");
      logEvent("Action-EditMode");
    } else if (cameraState === "edit") {
      setCameraState("play");
    }
  }

  return (
    <motion.group
      position={position}
      onPointerOver={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onClick={handleClick}
    >
      <motion.mesh
        position={[0, 0, 0.05]}
        whileTap={{
          z: -0.005,
        }}
      >
        <boxGeometry args={[0.4, 0.4, 0.1]} />
        <motion.meshStandardMaterial
          color="#ccc7bf"
          animate={hover ? { color: "#fdc6ff" } : { color: "#ccc7bf" }}
        />
      </motion.mesh>
      <Center position={[0, 0, 0.11]}>
        <Svg src={penSvg} scale={0.017} fillMaterial={basic} />
      </Center>
    </motion.group>
  );
};

export default EditButton;

const penSvg =
  '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>';
