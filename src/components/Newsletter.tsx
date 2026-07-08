import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    toast.success("You're subscribed!", {
      description: "Thanks for joining the Curry On A Stik' family.",
    });
    setEmail("");
  }

  return (
    <section className="border-y border-border bg-cream">
      <div className="container-page py-14 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Join the newsletter</h2>
          <p className="mt-3 text-muted-foreground">
            Grooming tips, new products and special offers — straight to your inbox.
          </p>
          <form
            onSubmit={submit}
            className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-11 bg-background"
              aria-label="Email address"
            />
            <Button type="submit" size="lg" className="shrink-0">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
