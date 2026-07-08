import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { getPolicy, policies, type Policy } from "@/data/site";

export const Route = createFileRoute("/policies/$policy")({
  loader: ({ params }) => {
    const policy = getPolicy(params.policy);
    if (!policy) throw notFound();
    return { policy };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Policy not found — Curry On A Stik'" }, { name: "robots", content: "noindex" }] };
    }
    const { policy } = loaderData;
    return {
      meta: [
        { title: `${policy.title} — Curry On A Stik'` },
        { name: "description", content: `${policy.title} for Curry On A Stik'.` },
        { property: "og:title", content: `${policy.title} — Curry On A Stik'` },
        { property: "og:description", content: `${policy.title} for Curry On A Stik'.` },
      ],
    };
  },
  notFoundComponent: PolicyNotFound,
  errorComponent: PolicyNotFound,
  component: PolicyPage,
});

function PolicyNotFound() {
  return (
    <div className="container-page flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-2xl font-bold">Policy not found</h1>
      <Button asChild>
        <Link to="/">Go home</Link>
      </Button>
    </div>
  );
}

function PolicyPage() {
  const { policy } = Route.useLoaderData() as { policy: Policy };

  return (
    <section className="container-page py-14 md:py-20">
      <div className="mx-auto max-w-3xl">
        <nav className="mb-4 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>{" "}
          / <span className="text-foreground">{policy.title}</span>
        </nav>
        <h1 className="text-3xl font-bold md:text-4xl">{policy.title}</h1>

        <div className="mt-8 space-y-8">
          {policy.sections.map((s, i) => (
            <div key={i}>
              {s.heading && <h2 className="text-lg font-bold">{s.heading}</h2>}
              <p className="mt-2 leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-2 border-t border-border pt-8">
          {policies
            .filter((p) => p.slug !== policy.slug)
            .map((p) => (
              <Button key={p.slug} asChild variant="outline" size="sm">
                <Link to="/policies/$policy" params={{ policy: p.slug }}>
                  {p.title}
                </Link>
              </Button>
            ))}
        </div>
      </div>
    </section>
  );
}
