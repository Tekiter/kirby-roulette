import { FC, ReactNode, useEffect, useState } from "react";
import {
  EventLoggerContext,
  EventLoggerController,
} from "./eventLoggerContext";

interface EventLoggerProviderProps {
  children: ReactNode;
  apiKey: string;
}

const AmplitudeProvider: FC<EventLoggerProviderProps> = ({
  children,
  apiKey,
}) => {
  const [controller, setController] = useState<EventLoggerController>({
    logEvent(key, data) {
      console.log("[LogEvent]", key, data);
    },
  });

  useEffect(() => {
    import("@amplitude/analytics-browser").then(({ createInstance }) => {
      const instance = createInstance();
      instance.init(apiKey);

      setController({
        logEvent(key, data) {
          instance.logEvent(key, data);
        },
      });
    });
  }, [apiKey]);

  return (
    <EventLoggerContext.Provider value={controller}>
      {children}
    </EventLoggerContext.Provider>
  );
};

export default AmplitudeProvider;
