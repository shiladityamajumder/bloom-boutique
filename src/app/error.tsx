"use client";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="site-shell empty-state">
      <p className="eyebrow">A small pause</p>
      <h1>
        Let’s Try <em>That Again.</em>
      </h1>
      <p>
        Something interrupted this page. Your saved bouquets are still in your
        browser.
      </p>
      <button className="button button--primary" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
