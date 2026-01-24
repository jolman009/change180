import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./components/ErrorPage";

createRoot(document.getElementById("root")!).render(
    <ErrorBoundary FallbackComponent={ErrorPage}>
        <App />
    </ErrorBoundary>
);
