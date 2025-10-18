import type { Article } from "../store/slices/articlesSlice";
import { formatDistanceToNow } from "date-fns";
import { ExternalLink, Calendar, User } from "lucide-react";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const timeAgo = article.publishedAt
    ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })
    : null;

  return (
    <article className="group relative bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col h-full"
      >
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          {article.imageUrl ? (
            <img
              src={article.imageUrl || "/placeholder.svg"}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-secondary">
              <span className="text-6xl font-bold text-muted-foreground/20">
                {article.source.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          {/* Source Badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-background/90 backdrop-blur-sm text-foreground border border-border">
              {article.source.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Category */}
          {article.category && (
            <div className="mb-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {article.category}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors text-balance">
            {article.title}
          </h3>

          {/* Description */}
          {article.description && (
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
              {article.description}
            </p>
          )}

          {/* Meta */}
          <div className="mt-auto flex items-center gap-4 text-xs text-muted-foreground">
            {article.author && (
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span className="line-clamp-1">{article.author}</span>
              </div>
            )}
            {timeAgo && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{timeAgo}</span>
              </div>
            )}
            <div className="ml-auto">
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </a>
    </article>
  );
}
