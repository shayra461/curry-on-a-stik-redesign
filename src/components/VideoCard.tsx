import { useState } from "react";
import { Play } from "lucide-react";
import type { VideoItem } from "@/data/site";

export function VideoCard({ video }: { video: VideoItem }) {
  const [active, setActive] = useState(false);

  const src =
    video.provider === "vimeo"
      ? `https://player.vimeo.com/video/${video.id}?title=0&byline=0&portrait=0`
      : `https://www.youtube.com/embed/${video.id}?rel=0`;

  const thumb =
    video.provider === "youtube"
      ? `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`
      : undefined;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      <div className="relative aspect-video bg-cream">
        {active ? (
          <iframe
            src={`${src}${video.provider === "vimeo" ? "&autoplay=1" : "&autoplay=1"}`}
            title={video.title}
            loading="lazy"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            onClick={() => setActive(true)}
            className="group absolute inset-0 flex items-center justify-center"
            aria-label={`Play ${video.title}`}
          >
            {thumb ? (
              <img
                src={thumb}
                alt={video.title}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-secondary" />
            )}
            <span className="absolute inset-0 bg-foreground/20 transition-colors group-hover:bg-foreground/30" />
            <span className="relative grid h-16 w-16 place-items-center rounded-full bg-background/95 text-primary shadow-card-hover transition-transform group-hover:scale-105">
              <Play className="h-6 w-6 translate-x-0.5 fill-primary" />
            </span>
          </button>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-base font-bold">{video.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{video.description}</p>
      </div>
    </div>
  );
}
