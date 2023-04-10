import { createContext } from "react";

interface Events {
  "Action-SpinRoulette": {};
  "Action-EditMode": {};
  "Action-AddItem": {
    length: number;
  };
  "Action-RemoveItem": {
    length: number;
  };
}

export interface EventLoggerController {
  logEvent<K extends keyof Events>(key: K, data: Events[K]): void;
}

export const EventLoggerContext = createContext<EventLoggerController>(
  new Proxy({} as EventLoggerController, {
    get() {
      throw new Error("EventLogger is not set.");
    },
  })
);
