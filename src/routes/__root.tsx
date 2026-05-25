import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-9xl text-primary">404</h1>
        <h2 className="mt-4 text-xs font-bold uppercase tracking-[0.3em] text-accent">Off Course</h2>
        <p className="mt-4 text-sm text-muted-foreground">
          This page is outside our coordinates. Let's get you back to dry land.
        </p>
        <div className="mt-8">
          <Link to="/" className="inline-flex items-center justify-center bg-primary px-8 py-4 text-[10px] font-bold uppercase tracking-[0.25em] text-white hover:bg-accent hover:text-primary transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-4xl text-primary">Something broke loose.</h1>
        <p className="mt-4 text-sm text-muted-foreground">Please refresh or head back home.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="bg-primary px-6 py-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white hover:bg-accent hover:text-primary"
          >Try Again</button>
          <a href="/" className="border border-primary/20 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-primary/5">Go Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "OffshoreCV, Professional CV Writing for Offshore Energy" },
      { name: "description", content: "Specialist CV writing and job search support for offshore oil & gas, renewables, and marine professionals worldwide." },
      { name: "author", content: "OffshoreCV" },
      { property: "og:title", content: "OffshoreCV, Professional CV Writing for Offshore Energy" },
      { property: "og:description", content: "Specialist CV writing and job search support for offshore oil & gas, renewables, and marine professionals worldwide." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "OffshoreCV, Professional CV Writing for Offshore Energy" },
      { name: "twitter:description", content: "Specialist CV writing and job search support for offshore oil & gas, renewables, and marine professionals worldwide." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/58805d4f-2a67-4d65-a2e6-1c1eef67cad0/id-preview-83e987f0--135bafff-2684-4bf3-b469-7e077fc57188.lovable.app-1778793818260.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/58805d4f-2a67-4d65-a2e6-1c1eef67cad0/id-preview-83e987f0--135bafff-2684-4bf3-b469-7e077fc57188.lovable.app-1778793818260.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const themeInitScript = `try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}`;

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-surface">
        <Header />
        <main className="flex-1"><Outlet /></main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
