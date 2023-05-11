import { Suspense } from "react";
import AmplitudeProvider from "./eventLogger/AmplitudeProvider";
import Canvas from "./roulette/RouletteCanvas";

function App() {
  return (
    <AmplitudeProvider apiKey={import.meta.env.VITE_AMPLITUDE_API_KEY}>
      <div className="absolute inset-0">
        <Suspense fallback={<p>Loading...</p>}>
          <Canvas />
        </Suspense>
      </div>
    </AmplitudeProvider>
  );
}

export default App;
