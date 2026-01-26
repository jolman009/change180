import { FallbackProps } from "react-error-boundary";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const ErrorPage = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 text-center">
      <h1 className="text-4xl font-bold text-destructive mb-4">{t("error.title")}</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        {t("error.description")}
      </p>
      {process.env.NODE_ENV === "development" && (
        <pre className="bg-muted p-4 rounded text-xs text-left overflow-auto max-w-2xl mb-8">
          {error.message}
        </pre>
      )}
      <Button onClick={resetErrorBoundary} variant="default">
        {t("error.tryAgain")}
      </Button>
    </div>
  );
};

export default ErrorPage;
