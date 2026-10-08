import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found site-shell">
      <p className="eyebrow">404 · Lost petal</p>
      <h1>This page hasn’t bloomed yet.</h1>
      <Link className="button button--primary" href="/">
        Return home
      </Link>
    </main>
  );
}
