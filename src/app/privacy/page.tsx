import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Privacy Policy" };
export default function Privacy() {
  return (
    <main className="site-shell">
      <div className="page-heading">
        <p className="eyebrow">Your trust matters</p>
        <h1>
          Privacy <em>& Care.</em>
        </h1>
        <p>How this website handles the details you share.</p>
      </div>
      <div className="prose">
        <section>
          <h2>Information you choose to share</h2>
          <p>
            When you submit an inquiry or order request, we collect the contact
            details, preferences, delivery details and message you provide.
            Newsletter subscriptions collect your email and consent. These
            details are used for the purpose you requested: responding to your
            inquiry, reviewing an order request or recording your newsletter
            subscription.
          </p>
        </section>
        <section>
          <h2>Saved bouquets and your bag</h2>
          <p>
            Your wishlist and shopping bag are saved in your browser’s local
            storage so they remain available when you return. This includes gift
            messages you add. These details are sent to the server only if you
            submit an order request. Clear your bag or your browser’s site data
            to remove them.
          </p>
        </section>
        <section>
          <h2>Storage and services</h2>
          <p>
            Form submissions are stored on the site’s server, or sent to the
            operator’s configured form processing service. This version does not
            use advertising trackers, analytics cookies or third-party payment
            processing. Fonts and images are served with the website. Hosting
            providers may keep routine technical access logs.
          </p>
        </section>
        <section>
          <h2>Your choices</h2>
          <p>
            Newsletter consent is optional and separate from submitting an
            inquiry. You can request access to, correction of, or deletion of
            submitted details by contacting{" "}
            <a href="mailto:hello@lamedesfleurs.com">hello@lamedesfleurs.com</a>
            . Include your submission reference where possible. To withdraw
            newsletter consent, contact the same address.
          </p>
          <p>
            The operator must configure data retention, service providers and a
            monitored contact address before the website opens for business.
            Questions about your details?{" "}
            <Link href="/contact">Get in touch.</Link>
          </p>
        </section>
      </div>
    </main>
  );
}
