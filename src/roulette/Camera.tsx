import { useFrame, useThree } from "@react-three/fiber";
import { useAtomValue } from "jotai";
import { FC, useEffect, useState } from "react";
import { Vector3 } from "three";

import { isDebugAtom } from "./states/debug";
import { cameraStateAtom } from "./states/spinner";

interface CameraProps {}

const Camera: FC<CameraProps> = () => {
  const isDebug = useAtomValue(isDebugAtom);
  const mode = useAtomValue(cameraStateAtom);
  const { camera } = useThree((camera) => camera);

  const [cameraPos] = useState(() => new Vector3(0, 0, 0));
  const [currentLookAtPos] = useState(() => new Vector3(0, 0, 0));
  const [targetLookAtPos] = useState(() => new Vector3(0, 0, 0));

  useFrame(() => {
    if (isDebug) {
      return;
    }

    currentLookAtPos.lerp(targetLookAtPos, 0.03);

    camera.position.lerp(cameraPos, 0.03);
    camera.lookAt(currentLookAtPos);
    camera.updateProjectionMatrix();
  });

  useEffect(() => {
    if (mode === "edit") {
      cameraPos.set(-4.5, 4.5, 3.5);
      targetLookAtPos.set(-1, 3.5, 0);
    } else if (mode === "play") {
      cameraPos.set(0, 3.6, 7);
      targetLookAtPos.set(0, 2.7, 0);
    }
  }, [mode, isDebug, cameraPos, targetLookAtPos]);

  return <></>;
};

export default Camera;
