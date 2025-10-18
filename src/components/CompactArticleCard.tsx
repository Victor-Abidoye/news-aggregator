import type { Article } from "../store/slices/articlesSlice";
import { formatDistanceToNow } from "date-fns";
import { ExternalLink, Clock } from "lucide-react";

interface CompactArticleCardProps {
  article: Article;
}

export default function CompactArticleCard({
  article,
}: CompactArticleCardProps) {
  const timeAgo = article.publishedAt
    ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })
    : null;

  return (
    <article className="group relative bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-200">
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex gap-4 p-4"
      >
        {/* Image */}
        <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-muted">
          {article.imageUrl ? (
            <img
              src={article.imageUrl || "/placeholder.svg"}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-secondary">
              <span className="text-2xl font-bold text-muted-foreground/20">
                {article.source.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Source Badge */}
          <div className="mb-1.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground">
              {article.source.toUpperCase()}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-foreground mb-1.5 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
            {article.title}
          </h3>

          {/* Meta */}
          <div className="mt-auto flex items-center gap-3 text-xs text-muted-foreground">
            {timeAgo && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{timeAgo}</span>
              </div>
            )}
            <div className="ml-auto">
              <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </a>
    </article>
  );
}
