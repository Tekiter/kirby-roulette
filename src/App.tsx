import { Suspense } from "react";
import AmplitudeProvider from "./eventLogger/AmplitudeProvider";
import Canvas from "./roulette/RouletteCanvas";
import ItemList from "./roulette/ItemList";
import MobileButtons from "./roulette/MobileButtons";

function App() {
  return (
    <AmplitudeProvider apiKey={import.meta.env.VITE_AMPLITUDE_API_KEY}>
      <div className="h-full">
        <Suspense fallback={<p>Loading...</p>}>
          <Canvas />
        </Suspense>

        <ItemList />
        <MobileButtons />
      </div>
    </AmplitudeProvider>
  );
}

export default App;
