import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const animalOptions = [
  { id: "horse", label: "Horses 🐴" },
  { id: "dog", label: "Dogs 🐶" },
  { id: "cat", label: "Cats 🐱" },
] as const;

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [selectedAnimals, setSelectedAnimals] = useState<string[]>([]);

  function toggleAnimal(id: string) {
    setSelectedAnimals((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    const animalsText = selectedAnimals.length > 0 ? ` for your ${selectedAnimals.join(", ")}` : "";

    toast.success("Welcome to the Curry Club!", {
      description: `You're subscribed${animalsText}. Expect grooming tips in your inbox soon!`,
    });
    setEmail("");
    setSelectedAnimals([]);
  }

  return (
    <section className="bg-cream/40">
      <div className="container-page py-16 md:py-24 reveal-on-scroll">
        <div className="overflow-hidden rounded-[2.5rem] bg-[#1a1a1a] p-3 border border-white/5 shadow-xl">
          <div className="grid gap-6 lg:grid-cols-5">
            {/* Left Column - Image Banner */}
            <div className="relative lg:col-span-3 min-h-[360px] md:min-h-[420px] rounded-[2rem] overflow-hidden group">
              <img
                src="/newsletter_lifestyle.png"
                alt="Grooming lifestyle"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

              <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-12 text-white">
                <span className="self-start rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-light">
                  Curry On A Stik' Life 🌿
                </span>

                <div className="mt-auto">
                  <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl leading-tight font-serif italic text-white">
                    Groom with love,
                    <br />
                    <span className="font-sans not-italic text-accent-light">
                      shine with pride.
                    </span>
                  </h2>
                  <p className="mt-3 max-w-sm text-sm text-white/80 leading-relaxed">
                    Discover the grooming method trusted by professional equestrians and pet parents
                    worldwide.
                  </p>

                  <div className="mt-6">
                    <Link
                      to="/our-story"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-black hover:border-white"
                    >
                      Our Story
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:col-span-2 flex flex-col justify-center px-6 py-8 lg:px-8 lg:py-4 text-white">
              <div className="max-w-md">
                <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                  Join the Curry Club
                </h3>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">
                  Be the first to receive expert grooming advice, exclusive product offers, and
                  seasonal pet care guides.
                </p>

                <form onSubmit={submit} className="mt-8 space-y-6">
                  {/* Animal Preferences Selector */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/50">
                      Who are you grooming?
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {animalOptions.map((opt) => {
                        const isSelected = selectedAnimals.includes(opt.id);
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => toggleAnimal(opt.id)}
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium border transition-all duration-300",
                              isSelected
                                ? "bg-accent border-accent text-accent-foreground shadow-sm"
                                : "bg-white/5 border-white/10 hover:bg-white/10 text-white",
                            )}
                          >
                            {isSelected && <Check className="h-3 w-3" />}
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Email Input Capsule */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/50">
                      Email Address
                    </span>
                    <div className="relative flex items-center rounded-full bg-white p-1 shadow-md border border-transparent focus-within:border-accent transition-all duration-300">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full bg-transparent px-4 text-sm text-black placeholder:text-gray-400 focus:outline-none"
                        aria-label="Email address"
                      />
                      <button
                        type="submit"
                        className="shrink-0 rounded-full bg-[#1a1a1a] hover:bg-black text-white px-6 py-3 text-xs font-semibold uppercase tracking-wider transition-colors duration-200"
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
