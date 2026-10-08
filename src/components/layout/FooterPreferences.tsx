"use client";
import Link from "next/link";
import { useRef } from "react";
import { ShieldCheck, X } from "lucide-react";

export function FooterPreferences() {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        type="button"
        className="footer-preferences"
        onClick={() => dialog.current?.showModal()}
      >
        Cookie Preferences
      </button>
      <dialog
        ref={dialog}
        className="privacy-dialog"
        aria-labelledby="cookie-preferences-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <button
          type="button"
          className="privacy-dialog__close"
          aria-label="Close cookie preferences"
          onClick={() => dialog.current?.close()}
        >
          <X size={20} />
        </button>
        <ShieldCheck size={30} />
        <p className="eyebrow">Your privacy matters</p>
        <h2 id="cookie-preferences-title">Cookie Preferences</h2>
        <p>
          Your bag and saved bouquets use essential storage in your browser. We
          currently use no optional analytics or advertising cookies.
        </p>
        <p>
          You can remove saved items from your{" "}
          <Link href="/cart" onClick={() => dialog.current?.close()}>
            bag
          </Link>{" "}
          or{" "}
          <Link href="/wishlist" onClick={() => dialog.current?.close()}>
            wishlist
          </Link>
          , or clear this website’s data in your browser settings.
        </p>
        <Link
          href="/privacy"
          className="text-link"
          onClick={() => dialog.current?.close()}
        >
          Read our privacy policy
        </Link>
        <button
          type="button"
          className="button button--primary"
          onClick={() => dialog.current?.close()}
        >
          Understood
        </button>
      </dialog>
    </>
  );
}
