import { useState, useEffect } from "react";
import { Play } from "lucide-react";
import type { VideoItem } from "@/data/site";

export function VideoCard({ video, onClick }: { video: VideoItem; onClick: () => void }) {
  const [thumb, setThumb] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (video.provider === "youtube") {
      setThumb(`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`);
      setLoading(false);
    } else if (video.provider === "vimeo") {
      setLoading(true);
      fetch(`https://vimeo.com/api/v2/video/${video.id}.json`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data[0] && data[0].thumbnail_large) {
            setThumb(data[0].thumbnail_large);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch Vimeo thumbnail:", err);
          setLoading(false);
        });
    }
  }, [video.id, video.provider]);

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-[2rem] border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-secondary/10">
        {loading ? (
          <div className="absolute inset-0 animate-pulse bg-secondary/20" />
        ) : thumb ? (
          <img
            src={thumb}
            alt={video.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-secondary/20" />
        )}

        {/* Video Overlay Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent transition-opacity group-hover:opacity-90" />

        {/* Play Button Capsule */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[#1a1a1a] shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground">
            <Play className="h-5 w-5 translate-x-0.5 fill-current" />
            <span className="absolute -inset-2 animate-ping rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        {/* Video Duration Badge or Provider Indicator */}
        <span className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
          {video.provider}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-base font-bold tracking-tight transition-colors group-hover:text-primary">
          {video.title}
        </h3>
        <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{video.description}</p>
      </div>
    </div>
  );
}
