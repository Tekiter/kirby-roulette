import { Suspense, lazy } from "react";
import AmplitudeProvider from "./eventLogger/AmplitudeProvider";
import Canvas from "./roulette/RouletteCanvas";
import ItemList from "./roulette/ItemList";
import MobileButtons from "./roulette/MobileButtons";
import { Loading } from "./Loading";

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
