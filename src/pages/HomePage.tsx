import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import ArticleList from "../components/ArticleList";
import CompactArticleCard from "../components/CompactArticleCard";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { useEffect, useMemo } from "react";
import { fetchArticlesThunk } from "../store/thunks/fetchArticlesThunk";
import {
  selectAllArticles,
  selectPersonalizedArticles,
} from "../store/selectors";
import { Loader2 } from "lucide-react";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = shuffled[i]!;
    shuffled[i] = shuffled[j]!;
    shuffled[j] = tmp;
  }
  return shuffled;
}

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((s) => s.articles);
  const allArticles = useAppSelector(selectAllArticles);
  const personalizedArticles = useAppSelector(selectPersonalizedArticles);

  useEffect(() => {
    dispatch(fetchArticlesThunk());
  }, [dispatch]);

  const latestNews = useMemo(
    () => shuffleArray(allArticles).slice(0, 6),
    [allArticles]
  );

  const shuffledPersonalized = useMemo(
    () => shuffleArray(personalizedArticles),
    [personalizedArticles]
  );

  const paginatedArticles = shuffledPersonalized;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search and Filter Section */}
      <section className="mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1 w-full">
            <SearchBar />
          </div>
          <div className="shrink-0">
            <FilterDropdown />
          </div>
        </div>
      </section>

      {/* Latest News Section - Compact Cards */}
      <section className="mb-16">
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
      </section>

      {/* Personalized Feed Section - Full Cards without Pagination */}
      <section className="mb-12">
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
              {paginatedArticles.map((article) => (
                <ArticleList key={article.id} articles={[article]} />
              ))}
            </div>

            {/* Pagination removed for continuous scroll */}
          </>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20 pt-8">
        <p className="text-center text-sm text-muted-foreground">
          Powered by NewsAPI, The Guardian, and NY Times
        </p>
      </footer>
    </main>
  );
}
