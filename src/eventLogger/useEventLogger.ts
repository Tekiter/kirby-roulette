import { useContext } from "react";

import { EventLoggerContext } from "./eventLoggerContext";

const useEventLogger = () => {
  const controller = useContext(EventLoggerContext);

  return controller;
};

export default useEventLogger;
