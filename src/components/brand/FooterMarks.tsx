export function SocialMark({ name }: { name: string }) {
  if (name === "Instagram")
    return (
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  if (name === "Facebook")
    return (
      <svg
        viewBox="0 0 24 24"
        width="25"
        height="25"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M15.4 5.2H18V1.1A30 30 0 0 0 14.3.9c-3.7 0-6.2 2.3-6.2 6.6v3.7H4v4.6h4.1V24h5.1v-8.2h4.2l.7-4.6h-4.9V8c0-1.3.4-2.8 2.2-2.8Z" />
      </svg>
    );
  if (name === "YouTube")
    return (
      <svg viewBox="0 0 24 24" width="25" height="25" aria-hidden="true">
        <rect x="1" y="4" width="22" height="16" rx="5" fill="currentColor" />
        <path d="m10 8 6 4-6 4Z" fill="#fff7f9" />
      </svg>
    );
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2a10 10 0 0 0-3.64 19.31c-.03-.77-.02-1.7.19-2.6l1.29-5.48s-.32-.64-.32-1.58c0-1.49.86-2.6 1.93-2.6.91 0 1.35.69 1.35 1.51 0 .92-.58 2.29-.89 3.56-.25 1.07.54 1.94 1.6 1.94 1.92 0 3.21-2.46 3.21-5.38 0-2.22-1.5-3.89-4.23-3.89-3.08 0-5 2.29-5 4.85 0 .88.26 1.49.67 1.97.19.22.22.32.15.57l-.22.82c-.07.26-.28.35-.52.25-1.45-.59-2.12-2.16-2.12-3.93 0-2.92 2.47-6.42 7.38-6.42 3.94 0 6.53 2.85 6.53 5.91 0 4.04-2.25 7.06-5.58 7.06-1.12 0-2.17-.61-2.53-1.3l-.7 2.79c-.25.9-.73 1.8-1.16 2.5A10 10 0 1 0 12 2Z" />
    </svg>
  );
}

export function PaymentMarks() {
  return (
    <div className="payment-marks" aria-label="Illustrative payment methods">
      <span className="payment-mark payment-mark--visa" aria-label="Visa">
        VISA
      </span>
      <span className="payment-mark" role="img" aria-label="Mastercard">
        <svg viewBox="0 0 40 26" width="39" height="25" aria-hidden="true">
          <circle cx="14" cy="13" r="11" fill="#eb001b" />
          <circle cx="26" cy="13" r="11" fill="#f79e1b" />
          <path
            d="M20 3.8a11 11 0 0 1 0 18.4 11 11 0 0 1 0-18.4Z"
            fill="#ff5f00"
          />
        </svg>
      </span>
      <span className="payment-mark payment-mark--paypal" aria-label="PayPal">
        PayPal
      </span>
      <span className="payment-mark payment-mark--apple" aria-label="Apple Pay">
        <svg
          viewBox="0 0 20 23"
          width="16"
          height="19"
          aria-hidden="true"
          fill="currentColor"
        >
          <path
            d="M14.1 3.6c.9-1.1 1.5-2.6 1.3-3.6-1.3.1-2.9.9-3.8 2-.8.9-1.5 2.4-1.3 3.6 1.4.1 2.8-.7 3.8-2Zm3.5 8.8c0-3.1 2.5-4.5 2.6-4.6-1.4-2.2-3.6-2.4-4.4-2.4-1.9-.2-3.6 1.1-4.6 1.1s-2.4-1.1-4-1.1C5.1 5.4 3.1 6.6 2 8.5-.2 12.2 1.4 17.7 3.5 20.7c1 1.5 2.2 3.1 3.8 3 1.5 0 2.1-1 4-1s2.4 1 4 1c1.7 0 2.8-1.5 3.8-3 1.2-1.7 1.7-3.3 1.7-3.4-.1 0-3.2-1.2-3.2-4.9Z"
            transform="translate(-1 -1) scale(.9)"
          />
        </svg>
        Pay
      </span>
      <span
        className="payment-mark payment-mark--google"
        aria-label="Google Pay"
      >
        <b>G</b> Pay
      </span>
    </div>
  );
}
