import { useState, useEffect } from "react";

function useSessionStorage(key, defaultValue) {
  const getStoredValue = () => {
    if (typeof window === 'undefined') return defaultValue;
    const stored = sessionStorage.getItem(key);
    if (stored !== null) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.warn(`Parsing error on sessionStorage key "${key}"`, e);
      }
    }
    return defaultValue;
  };

  const [value, setValue] = useState(() => getStoredValue());

  // Update sessionStorage when value changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (value === null) {
        sessionStorage.removeItem(key);
      } else {
        sessionStorage.setItem(key, JSON.stringify(value));
      }
    }
  }, [key, value]);

  return [value, setValue];
}

export default useSessionStorage;