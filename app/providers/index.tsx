'use client';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { ReactNode, useState } from 'react';

const clientConfig = {
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry(failureCount: number, error: unknown) {
        const err = error as { status?: number };
        if (err.status === 404) return false;
        if (failureCount < 2) return true;
        return false;
      },
    },
  },
};

export default function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(new QueryClient(clientConfig));

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
