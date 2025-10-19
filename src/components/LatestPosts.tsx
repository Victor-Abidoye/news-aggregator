import CompactArticleCard from "./CompactArticleCard";
import type { Article } from "@/store/slices/articlesSlice";
import { Loader2 } from "lucide-react";

export default function LatestPosts({
  latestNews,
  isLoading,
}: {
  latestNews: Article[];
  isLoading: boolean;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-1">
            Latest News
          </h2>
          <p className="text-sm text-muted-foreground">
            Top stories from all sources
          </p>
        </div>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {latestNews.map((article) => (
            <CompactArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
