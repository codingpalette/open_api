'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 0,
      enabled: true,
    },
  },
});

type Props = {
  children: React.ReactNode;
};

const ReactQueryWrapper = ({ children }: Props) => {
  return(
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default ReactQueryWrapper