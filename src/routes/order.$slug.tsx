import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { getProduct } from "@/data/products";

const ORDER_EMAIL = "cv@offshorecv.com";

export const Route = createFileRoute("/order/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `Order, ${loaderData.product.name}` : "Order, OffshoreCV" },
      { name: "description", content: "Place your order. We'll email you a PayPal or bank invoice within 24h. Download link sent the moment payment clears." },
      { name: "robots", content: "noindex" },
    ],
  }),
  notFoundComponent: () => (
    <div className="min-h-[60vh] flex items-center justify-center px-6 text-center">
      <div>
        <div className="font-serif text-5xl mb-4">Not found</div>
        <Link to="/shop" className="text-[11px] font-bold uppercase tracking-[0.25em] border-b-2 border-foreground pb-1">Back to shop →</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-[60vh] flex items-center justify-center px-6 text-center">
      <div>
        <div className="font-serif text-4xl mb-4">Order error</div>
        <p className="text-muted-foreground mb-6">{error.message}</p>
        <Link to="/shop" className="text-[11px] font-bold uppercase tracking-[0.25em] border-b-2 border-foreground pb-1">Back to shop →</Link>
      </div>
    </div>
  ),
  component: OrderPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  country: z.string().trim().min(2, "Country is required").max(80),
  payment: z.enum(["paypal", "bank"]),
  message: z.string().trim().max(1000).optional(),
});

function OrderPage() {
  const { product } = Route.useLoaderData();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Partial<Record<keyof z.infer<typeof schema>, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      country: fd.get("country"),
      payment: fd.get("payment"),
      message: fd.get("message") || undefined,
    });
    if (!parsed.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof z.infer<typeof schema>;
        fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const d = parsed.data;
    const subject = `Order: ${product.name}, £${product.price}`;
    const body =
      `New order from offshorecv.com\n\n` +
      `Product: ${product.name}\n` +
      `Slug:    ${product.slug}\n` +
      `Price:   £${product.price}\n` +
      `Format:  ${product.format}\n\n` +
      `--- Customer ---\n` +
      `Name:    ${d.name}\n` +
      `Email:   ${d.email}\n` +
      `Country: ${d.country}\n` +
      `Pay via: ${d.payment === "paypal" ? "PayPal" : "Bank transfer"}\n\n` +
      `--- Notes ---\n${d.message ?? "(none)"}\n`;
    const mailto = `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setTimeout(() => {
      navigate({ to: "/order/thank-you", search: { slug: product.slug } });
    }, 400);
  }

  return (
    <section className="py-16 lg:py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16">
        <aside className="lg:col-span-5">
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-foreground/60 mb-4">,  Your order</div>
          <h1 className="font-serif text-4xl lg:text-5xl leading-tight mb-8">{product.name}</h1>
          <div className="border-y border-primary/15 py-6 mb-8 space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Format</span><span className="font-medium">{product.format}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className="font-medium">Email link, post-payment</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Updates</span><span className="font-medium">Lifetime</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Refund</span><span className="font-medium">30-day money-back</span></div>
          </div>
          <div className="flex items-baseline justify-between mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/60">Total</span>
            <span className="font-serif text-5xl">£{product.price}</span>
          </div>
          <Link to="/product/$slug" params={{ slug: product.slug }} className="text-[10px] font-bold uppercase tracking-[0.25em] border-b-2 border-foreground pb-1">
            ← Back to product
          </Link>
        </aside>

        <div className="lg:col-span-7">
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-foreground/60 mb-4">,  Step 02</div>
          <h2 className="font-serif text-3xl lg:text-4xl leading-tight mb-3">Place your order.</h2>
          <p className="text-muted-foreground mb-10 leading-relaxed max-w-lg">
            Submitting this form opens your email client with the order details pre-filled. We reply within 24h with a PayPal link or bank details, then send your download link the moment payment clears.
          </p>

          <form onSubmit={handleSubmit} noValidate className="space-y-8">
            <Field name="name" label="Full name" error={errors.name} />
            <Field name="email" type="email" label="Email address" error={errors.email} />
            <Field name="country" label="Country" placeholder="e.g. United Kingdom" error={errors.country} />

            <fieldset>
              <legend className="text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/60 mb-3">Preferred payment</legend>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { v: "paypal", label: "PayPal" },
                  { v: "bank", label: "Bank Transfer" },
                ].map((opt, i) => (
                  <label key={opt.v} className="relative cursor-pointer">
                    <input type="radio" name="payment" value={opt.v} defaultChecked={i === 0} className="peer sr-only" />
                    <div className="border border-primary/20 px-5 py-4 text-center text-[11px] font-bold uppercase tracking-[0.22em] peer-checked:bg-foreground peer-checked:text-background peer-checked:border-foreground transition-colors">
                      {opt.label}
                    </div>
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/60 mb-2">Notes (optional)</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                maxLength={1000}
                className="w-full border-b border-primary/20 py-3 bg-transparent focus:border-foreground outline-none resize-none text-base"
                placeholder="Anything else we should know?"
              />
              {errors.message && <p className="text-xs text-destructive mt-2">{errors.message}</p>}
            </div>

            <div className="pt-6 border-t border-primary/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                By submitting you agree to receive a one time invoice email at the address above.
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-4 bg-foreground text-background text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-accent transition-colors disabled:opacity-60"
              >
                {submitting ? "Opening email…" : `Place order, £${product.price} →`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/60 mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full border-b border-primary/20 py-3 bg-transparent focus:border-foreground outline-none text-base"
      />
      {error && <p className="text-xs text-destructive mt-2">{error}</p>}
    </div>
  );
}
