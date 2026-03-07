import { PopupButton } from "react-calendly";
import { CALENDLY_URL } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { buildCalendlyPrefill, type BillingPackageId } from "@/lib/billing";

interface BookingCTAProps {
  text: string;
  className?: string;
  packageId?: BillingPackageId;
  calendlyUrl?: string;
}

const BookingCTA = ({ text, className, packageId, calendlyUrl }: BookingCTAProps) => {
  const url = calendlyUrl || CALENDLY_URL;
  const prefill = buildCalendlyPrefill(packageId);

  return (
    <PopupButton
      url={url}
      rootElement={document.getElementById("root")!}
      prefill={prefill}
      text={text}
      onClick={() =>
        trackEvent("booking_cta_clicked", {
          package_id: packageId ?? "unspecified",
        })
      }
      className={className}
    />
  );
};

export default BookingCTA;
