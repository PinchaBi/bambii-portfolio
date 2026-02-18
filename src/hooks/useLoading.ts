import { useCallback, useEffect, useRef, useState } from "react";

// Minimum time the loading screen stays visible so the B animation
// can complete at least one full draw cycle before fading out.
const MIN_LOADING_MS = 1850;

export const useLoading = (minMs = MIN_LOADING_MS) => {
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      minTimeReady.current = true;
      tryFinish();
    }, minMs);
    return () => clearTimeout(timer);
  }, [minMs, tryFinish]);

  return { isLoading, handleLoaded } as const;
};
