import { lazy,Suspense } from "react";

import AmplitudeProvider from "./eventLogger/AmplitudeProvider";
import { Loading } from "./Loading";
import ItemList from "./roulette/ItemList";
import MobileButtons from "./roulette/MobileButtons";

const LazyCanvas = lazy(() => import("./roulette/RouletteCanvas"));

function App() {
  return (
    <AmplitudeProvider apiKey={import.meta.env.VITE_AMPLITUDE_API_KEY}>
      <div className="h-full relative">
        <Suspense fallback={<Loading />}>
          <LazyCanvas />
          <ItemList />
          <MobileButtons />
        </Suspense>
      </div>
    </AmplitudeProvider>
  );
}

export default App;
