import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { getProduct } from "@/data/products";

const searchSchema = z.object({ slug: z.string().optional() });

export const Route = createFileRoute("/order/thank-you")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Order received, OffshoreCV" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThankYou,
});

function ThankYou() {
  const { slug } = Route.useSearch();
  const product = slug ? getProduct(slug) : undefined;

  return (
    <section className="py-16 lg:py-12 min-h-[70vh]">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-foreground/60 mb-6">,  Order received</div>
        <h1 className="font-serif text-5xl lg:text-7xl leading-[0.95] mb-8 text-balance">
          Thank you. We've got <span className="italic">your order.</span>
        </h1>
        {product && (
          <p className="text-muted-foreground text-lg mb-10">
            <span className="font-medium text-foreground">{product.name}</span> · £{product.price}
          </p>
        )}
        <ol className="text-left max-w-xl mx-auto space-y-6 mb-14">
          {[
            ["01", "Your email client opened with the order details. Hit send if you haven't already."],
            ["02", "We'll reply within 24 hours (UK time) with a PayPal link or bank details."],
            ["03", "The moment payment clears, your private download link arrives in your inbox, yours to keep."],
          ].map(([n, t]) => (
            <li key={n} className="flex gap-6 border-b border-primary/15 pb-5">
              <span className="font-serif italic text-3xl text-foreground/40 shrink-0 leading-none">{n}</span>
              <span className="text-base leading-relaxed pt-1">{t}</span>
            </li>
          ))}
        </ol>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/shop" className="px-8 py-4 bg-foreground text-background text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-accent transition-colors">
            Back to shop →
          </Link>
          <Link to="/delivery" className="px-8 py-4 border border-primary/30 text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-secondary transition-colors">
            How delivery works
          </Link>
        </div>
      </div>
    </section>
  );
}
