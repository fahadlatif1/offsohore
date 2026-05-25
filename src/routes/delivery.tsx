import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/delivery")({
  head: () => ({
    meta: [
      { title: "How delivery works, OffshoreCV" },
      { name: "description", content: "How we deliver OffshoreCV digital downloads, ordering, payment, file delivery, refunds and lifetime updates." },
      { property: "og:title", content: "How delivery works, OffshoreCV" },
      { property: "og:description", content: "Order → Pay → Receive PDF. The complete delivery process for OffshoreCV digital downloads." },
    ],
  }),
  component: DeliveryPage,
});

const steps = [
  ["01", "You place the order", "Pick a product, fill the order form. Takes under a minute. You'll see a confirmation page and we'll see your request."],
  ["02", "We send an invoice within 24h", "We email you a PayPal payment link or UK bank transfer details, whichever you chose. Usually faster than 24h during UK working hours."],
  ["03", "You pay", "PayPal clears instantly. Bank transfer typically clears same day for UK accounts, 1, 2 business days internationally."],
  ["04", "We send your download link", "The moment payment lands, we email a private Google Drive or Dropbox link with your files. Yours forever, lifetime updates included."],
];

const faqs = [
  ["What files do I get?", "Most products are PDF. CV templates and cover letter packs are Word (.docx) plus a PDF reference. Recruiter and company lists come as Excel (.xlsx) plus PDF. The exact format is listed on every product page."],
  ["How long is the download link valid?", "Forever. The Google Drive / Dropbox link doesn't expire, bookmark it and re-download whenever you need."],
  ["Lifetime updates, what does that mean?", "When we revise a product (new recruiter contacts, updated certification costs, expanded sections), the same link gives you the new version. No re-purchase needed."],
  ["Can I get a refund?", "Yes, 30 days from delivery, no questions. Email us and we refund in full."],
  ["I haven't received my link", "Check spam first. Still nothing? Email cv@offshorecv.com with your order details and we'll resend within a few hours."],
  ["Do you store my payment details?", "No. PayPal and your bank handle the transaction, we never see card numbers."],
];

function DeliveryPage() {
  return (
    <>
      <section className="pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-primary/15">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-foreground/60 mb-8">,  Delivery & Refunds</div>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.92] mb-8 text-balance">
            How delivery <span className="italic">works.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            We sell digital products. No physical shipping, no shop floor, just four straightforward steps from order to download.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="border-t border-primary/20">
            {steps.map(([n, title, body]) => (
              <div key={n} className="grid lg:grid-cols-12 gap-6 lg:gap-10 py-10 border-b border-primary/15">
                <div className="lg:col-span-2 font-serif italic text-5xl text-foreground/30 leading-none">{n}</div>
                <div className="lg:col-span-3">
                  <h3 className="font-serif text-2xl lg:text-3xl leading-tight">{title}</h3>
                </div>
                <p className="lg:col-span-7 text-base text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-secondary/40 border-y border-primary/15">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-foreground/60 mb-4">,  Frequently asked</div>
          <h2 className="font-serif text-4xl lg:text-5xl mb-12">Questions, <span className="italic">answered.</span></h2>
          <dl className="space-y-8">
            {faqs.map(([q, a]) => (
              <div key={q} className="border-b border-primary/15 pb-6">
                <dt className="font-serif text-xl lg:text-2xl mb-3">{q}</dt>
                <dd className="text-base text-muted-foreground leading-relaxed max-w-3xl">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-16 lg:py-16 bg-foreground text-background text-center">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <h2 className="font-serif text-4xl lg:text-6xl leading-tight mb-6">
            Ready to <span className="italic">order?</span>
          </h2>
          <p className="text-background/70 mb-10 leading-relaxed">Browse the catalogue and pick what you need.</p>
          <Link to="/shop" className="inline-block px-10 py-5 bg-background text-foreground text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-secondary transition-colors">
            Browse digital downloads →
          </Link>
        </div>
      </section>
    </>
  );
}
