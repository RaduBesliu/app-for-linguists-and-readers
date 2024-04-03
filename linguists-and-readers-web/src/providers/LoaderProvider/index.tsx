import { ReactNode, useEffect, useMemo, useState } from 'react';
import { LoaderContext } from './context.ts';

const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log('[LoaderProvider] isLoading:', isLoading);
  }, [isLoading]);

  const value = useMemo(() => ({ isLoading, setIsLoading }), [isLoading, setIsLoading]);

  return <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>;
};

export default LoaderProvider;
