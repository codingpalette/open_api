'use client';
import {useRef} from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type Props = {
  children: React.ReactNode;
};

const ReactQueryWrapper = ({ children }: Props) => {
  const queryClient = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 5,
        },
      },
    }),
  ).current

  return(
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
};

export default ReactQueryWrapper;