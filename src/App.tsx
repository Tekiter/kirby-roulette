import AmplitudeProvider from "./eventLogger/AmplitudeProvider";
import Roulette from "./roulette/Roulette";

function App() {
  return (
    <AmplitudeProvider apiKey={import.meta.env.VITE_AMPLITUDE_API_KEY}>
      <div className="h-screen">
        <Roulette />
      </div>
    </AmplitudeProvider>
  );
}

export default App;
