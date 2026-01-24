import { FallbackProps } from "react-error-boundary";
import { Button } from "@/components/ui/button";

const ErrorPage = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 text-center">
      <h1 className="text-4xl font-bold text-destructive mb-4">Something went wrong</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        We apologize for the inconvenience. An unexpected error has occurred.
      </p>
      {process.env.NODE_ENV === "development" && (
        <pre className="bg-muted p-4 rounded text-xs text-left overflow-auto max-w-2xl mb-8">
          {error.message}
        </pre>
      )}
      <Button onClick={resetErrorBoundary} variant="default">
        Try Again
      </Button>
    </div>
  );
};

export default ErrorPage;
