type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

interface GtagWindow extends Window {
  gtag?: (command: string, eventName: string, params?: AnalyticsParams) => void;
}

export function trackEvent(eventName: string, params?: AnalyticsParams): void {
  if (typeof window === "undefined") return;

  const win = window as GtagWindow;
  if (typeof win.gtag === "function") {
    win.gtag("event", eventName, params);
  }
}
