import ArticleList from "./ArticleList";
import type { Article } from "@/store/slices/articlesSlice";
import { Loader2 } from "lucide-react";

export default function PersonalizedFeeds({
  shuffledPersonalized,
  isLoading,
}: {
  shuffledPersonalized: Article[];
  isLoading: boolean;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-1">
            Your Personalized Feed
          </h2>
          <p className="text-sm text-muted-foreground">
            Articles tailored to your preferences
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {shuffledPersonalized.map((article) => (
              <ArticleList key={article.id} articles={[article]} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
