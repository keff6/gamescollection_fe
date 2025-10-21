import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import proptypes from 'prop-types';

const LoadingContext = createContext({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
});

export const LoadingProvider = ({ children }) => {
  const [loadingCount, setLoadingCount] = useState(0);

  const startLoading = useCallback(() => {
    setLoadingCount((prev) => prev + 1);
  }, []);

  const stopLoading = useCallback(() => {
    setLoadingCount((prev) => Math.max(prev - 1, 0));
  }, []);

  const value = useMemo(
    () => ({
      isLoading: loadingCount > 0,
      startLoading,
      stopLoading,
    }),
    [loadingCount, startLoading, stopLoading]
  );

  LoadingProvider.propTypes = {
    children: proptypes.node,
  }

  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
};

export const useLoading = () => useContext(LoadingContext);