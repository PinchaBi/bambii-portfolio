import { useCallback, useEffect, useRef, useState } from "react";

// Minimum time the loading screen stays visible so the B animation
// can complete at least one full draw cycle before fading out.
const MIN_LOADING_MS = 1850;

export const useLoading = (minMs = MIN_LOADING_MS) => {
  const [isLoading, setIsLoading] = useState(true);
  const [timerKey, setTimerKey] = useState(0);
  const contentReady = useRef(false);
  const minTimeReady = useRef(false);

  const tryFinish = useCallback(() => {
    if (contentReady.current && minTimeReady.current) {
      setIsLoading(false);
    }
  }, []);

  const handleLoaded = useCallback(() => {
    contentReady.current = true;
    tryFinish();
  }, [tryFinish]);

  const startLoading = useCallback(() => {
    contentReady.current = false;
    minTimeReady.current = false;
    setIsLoading(true);
    setTimerKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      minTimeReady.current = true;
      tryFinish();
    }, minMs);
    return () => clearTimeout(timer);
  }, [minMs, tryFinish, timerKey]);

  return { isLoading, setIsLoading, handleLoaded, startLoading } as const;
};
