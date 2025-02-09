import { createContext } from "react";

interface Events {
  "Action-SpinRoulette": undefined;
  "Action-EditMode": undefined;
  "Action-AddItem": {
    length: number;
  };
  "Action-RemoveItem": {
    length: number;
  };
}

export interface EventLoggerController {
  logEvent<K extends keyof Events>(
    key: K,
    ...args: Events[K] extends undefined ? [] : [arg: Events[K]]
  ): void;
}

export const EventLoggerContext = createContext<EventLoggerController>(
  new Proxy({} as EventLoggerController, {
    get() {
      throw new Error("EventLogger is not set.");
    },
  })
);
