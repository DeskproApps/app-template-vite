import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { DeskproAppProvider, LoadingSpinner } from "@deskpro/app-sdk";
import { queryClient } from "./query";
import "@deskpro/deskpro-ui/dist/deskpro-ui.css";
import "@deskpro/deskpro-ui/dist/deskpro-custom-icons.css";
import "./index.css";
import { App } from "./App";

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render((
  <StrictMode>
    <DeskproAppProvider>
      <HashRouter>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<LoadingSpinner/>}>
            <ErrorBoundary fallback={<>here was an error!</>}>
              <App />
            </ErrorBoundary>
          </Suspense>
        </QueryClientProvider>
      </HashRouter>
    </DeskproAppProvider>
  </StrictMode>
));
