import { useEffect, useState } from "react";

export const Loading = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const pid = setInterval(() => {
      setStep((step) => step + 1);
    }, 500);

    return () => {
      clearInterval(pid);
    };
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-hand">
      Loading{".".repeat((step % 3) + 1)}
    </div>
  );
};
