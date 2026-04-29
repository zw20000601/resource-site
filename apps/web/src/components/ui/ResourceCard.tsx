import { Star, Bookmark } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface Resource {
  id: number;
  name: string;
  description: string;
  tags: string[];
  rating: number;
  collections: number;
  logo: string;
  logoBg: string;
}

interface ResourceCardProps {
  resource: Resource;
  variant?: "grid" | "list";
}

const TAG_COLORS = [
  "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "bg-green-500/20 text-green-300 border-green-500/30",
  "bg-pink-500/20 text-pink-300 border-pink-500/30",
  "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
];

export default function ResourceCard({ resource, variant = "grid" }: ResourceCardProps) {
  if (variant === "list") {
    return (
      <div className="resource-card rounded-xl p-4 flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${resource.logoBg}`}>
          {resource.logo}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white">{resource.name}</h3>
          <p className="text-sm text-slate-400 truncate">{resource.description}</p>
          <div className="flex gap-1 mt-1 flex-wrap">
            {resource.tags.slice(0, 3).map((tag, i) => (
              <span key={tag} className={`tag border text-xs ${TAG_COLORS[i % TAG_COLORS.length]}`}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0 text-sm text-slate-400">
          <span className="flex items-center gap-1">
            <Star size={13} className="text-yellow-400 fill-yellow-400" />
            {resource.rating}
          </span>
          <span className="flex items-center gap-1">
            <Bookmark size={13} />
            {formatNumber(resource.collections)}
          </span>
          <button className="btn-primary px-3 py-1.5 rounded-lg text-white text-sm">查看详情</button>
        </div>
      </div>
    );
  }

  return (
    <div className="resource-card rounded-xl p-4 flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${resource.logoBg}`}>
          {resource.logo}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white leading-tight">{resource.name}</h3>
          <p className="text-sm text-slate-400 mt-1 line-clamp-2">{resource.description}</p>
        </div>
      </div>
      <div className="flex gap-1 flex-wrap">
        {resource.tags.slice(0, 3).map((tag, i) => (
          <span key={tag} className={`tag border text-xs ${TAG_COLORS[i % TAG_COLORS.length]}`}>
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between text-sm text-slate-400 pt-1 border-t border-indigo-500/10">
        <span className="flex items-center gap-1">
          <Star size={13} className="text-yellow-400 fill-yellow-400" />
          {resource.rating}
        </span>
        <span className="flex items-center gap-1">
          <Bookmark size={13} />
          {formatNumber(resource.collections)}
        </span>
        <button className="btn-primary px-3 py-1.5 rounded-lg text-white text-xs">查看详情</button>
      </div>
    </div>
  );
}
