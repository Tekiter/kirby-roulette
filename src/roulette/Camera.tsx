import { useFrame, useThree } from "@react-three/fiber";
import { useAtomValue } from "jotai";
import { FC, useEffect, useMemo } from "react";
import { Vector3 } from "three";
import { modeAtom } from "./states";

interface CameraProps {}

const Camera: FC<CameraProps> = ({}) => {
  const mode = useAtomValue(modeAtom);
  const { camera } = useThree((camera) => camera);

  const cameraPos = useMemo(() => new Vector3(0, 0, 0), []);
  const currentLookAtPos = useMemo(() => new Vector3(0, 0, 0), []);
  const targetLookAtPos = useMemo(() => new Vector3(0, 0, 0), []);

  useFrame(() => {
    currentLookAtPos.lerp(targetLookAtPos, 0.05);

    camera.position.lerp(cameraPos, 0.05);
    camera.lookAt(currentLookAtPos);
    camera.updateProjectionMatrix();
  });

  useEffect(() => {
    if (mode === "edit") {
      //   cameraPos.set(-1.5, 4, 2);
      //   targetLookAtPos.set(-1, 3.2, 0);
      cameraPos.set(-3, 4, 3.5);
      targetLookAtPos.set(-1, 3, 0);
    } else if (mode === "play") {
      //   cameraPos.set(0, 2.7, 3);
      //   targetLookAtPos.set(0, 2.7, 0);
      cameraPos.set(0, 2.7, 5);
      targetLookAtPos.set(0, 2.7, 0);
    }
  }, [mode]);

  return <></>;
};

export default Camera;
