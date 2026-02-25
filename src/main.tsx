// 🚀 main.tsx — Entry Point
// QueryClientProvider 

import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store';

// QueryClient — yahi sara caching manage karta hai
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,  // 2 min tak data fresh maana jaega
      gcTime:    1000 * 60 * 10,
      retry: 2,                    // fail hone par 2 baar retry
      refetchOnWindowFocus: true,  // window focus par auto refetch
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <Provider store={store}> 
    {/* 🔑 QueryClientProvider — All app will wrap  */}
    <QueryClientProvider client={queryClient}>
      <App />
      {/* 🛠️ DevTools — only development shows */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
      </Provider>
  </React.StrictMode>
);
