import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProduct, relatedProducts, CATEGORIES, type Product } from "@/data/products";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }): { product: Product; related: Product[] } => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product, related: relatedProducts(params.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Product, OffshoreCV" }] };
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name}, OffshoreCV` },
        { name: "description", content: product.blurb },
        { property: "og:title", content: `${product.name}, £${product.price}` },
        { property: "og:description", content: product.blurb },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center">
        <div className="font-serif text-6xl mb-4">Not found</div>
        <p className="text-muted-foreground mb-8">That product doesn't exist.</p>
        <Link to="/shop" className="text-[11px] font-bold uppercase tracking-[0.25em] border-b-2 border-foreground pb-1">
          Back to shop →
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="font-serif text-5xl mb-4">Something broke</div>
        <p className="text-muted-foreground mb-6">{error.message}</p>
        <Link to="/shop" className="text-[11px] font-bold uppercase tracking-[0.25em] border-b-2 border-foreground pb-1">
          Back to shop →
        </Link>
      </div>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product, related } = Route.useLoaderData() as { product: Product; related: Product[] };
  const cat = CATEGORIES[product.category];

  return (
    <>
      <section className="border-b border-primary/15">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-6 text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/60">
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          <span className="mx-3 text-foreground/30">/</span>
          <span>{cat.label}</span>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16 lg:pb-24 grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-foreground/60 mb-6">{cat.eyebrow} {cat.label}</div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-8 text-balance">{product.name}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-10">{product.longBlurb}</p>

            <div className="flex flex-wrap items-baseline gap-6 mb-10 pb-10 border-b border-primary/15">
              <span className="font-serif text-6xl">£{product.price}</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/60">{product.format} · Delivered after payment</span>
            </div>

            <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase text-foreground/60 mb-6">,  What's included</h2>
            <ul className="space-y-4 mb-12">
              {product.includes.map((line, i) => (
                <li key={line} className="flex gap-5 border-b border-primary/10 pb-4">
                  <span className="font-serif italic text-xl text-foreground/40 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-base leading-relaxed">{line}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase text-foreground/60 mb-6">,  FAQ</h2>
            <dl className="space-y-6">
              <div className="border-b border-primary/10 pb-5">
                <dt className="font-serif text-xl mb-2">How is the product delivered?</dt>
                <dd className="text-sm text-muted-foreground leading-relaxed">Once your payment clears, we email you a private Google Drive / Dropbox link containing the {product.format} files. The link is yours to keep, including lifetime updates to this product.</dd>
              </div>
              <div className="border-b border-primary/10 pb-5">
                <dt className="font-serif text-xl mb-2">How long until I get it?</dt>
                <dd className="text-sm text-muted-foreground leading-relaxed">We send the payment invoice within 24h of receiving your order. Most buyers pay the same day and receive the download link within minutes of payment landing.</dd>
              </div>
              <div className="border-b border-primary/10 pb-5">
                <dt className="font-serif text-xl mb-2">Refund policy?</dt>
                <dd className="text-sm text-muted-foreground leading-relaxed">30-day money-back if the product doesn't help you. Email us, no questions.</dd>
              </div>
            </dl>
          </div>

          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="relative aspect-[3/4] mb-6 border border-primary/20 bg-secondary/60 overflow-hidden">
                <div className="absolute inset-0 [background-image:repeating-linear-gradient(0deg,transparent_0_2px,rgba(0,0,0,0.04)_2px_3px)]" />
                <div className="absolute inset-6 border border-primary/15 flex flex-col">
                  <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-foreground/50">OffshoreCV, {cat.label}</div>
                  <div className="mt-auto">
                    <div className="font-serif text-3xl lg:text-4xl italic leading-[1.05] text-balance">{product.name}</div>
                    <div className="mt-6 flex items-baseline justify-between border-t border-primary/15 pt-4">
                      <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-foreground/60">{product.format}</span>
                      <span className="font-serif text-2xl">£{product.price}</span>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                to="/order/$slug"
                params={{ slug: product.slug }}
                className="block w-full text-center py-5 bg-foreground text-background text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-accent transition-colors"
              >
                Order, £{product.price} →
              </Link>
              <Link
                to="/delivery"
                className="block text-center mt-4 text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/60 hover:text-foreground"
              >
                How delivery works
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-12 lg:py-16 bg-secondary/40">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-foreground/60 mb-4">,  Also in this series</div>
            <h2 className="font-serif text-3xl lg:text-4xl mb-10">More from <span className="italic">{cat.label}.</span></h2>
            <div className="grid md:grid-cols-3 gap-px bg-primary/15 border border-primary/15">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/product/$slug"
                  params={{ slug: r.slug }}
                  className="bg-background p-8 group flex flex-col h-full hover:bg-foreground hover:text-background transition-colors"
                >
                  <div className="flex items-start justify-between mb-6 text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/50 group-hover:text-background/60">
                    <span>{r.format}</span>
                    <span className="font-serif italic text-2xl">£{r.price}</span>
                  </div>
                  <h3 className="font-serif text-xl lg:text-2xl leading-tight mb-4">{r.name}</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-background/70 leading-relaxed mb-6 flex-1">{r.blurb}</p>
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] border-b-2 border-current pb-1 self-start">
                    View →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
