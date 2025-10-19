import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { useEffect, useMemo } from "react";
import { fetchArticlesThunk } from "../store/thunks/fetchArticlesThunk";
import {
  selectAllArticles,
  selectPersonalizedArticles,
} from "../store/selectors";
import LatestPosts from "../components/LatestPosts";
import PersonalizedFeeds from "../components/PersonalizedFeeds";

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

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section className="mb-12">
        <div className="flex flex-col items-start gap-4">
          <div className="w-full">
            <SearchBar />
          </div>
          <div className="flex-none self-end">
            <FilterDropdown />
          </div>
        </div>
      </section>

      <section className="mb-16">
        <LatestPosts latestNews={latestNews} isLoading={isLoading} />
      </section>

      <section>
        <PersonalizedFeeds isLoading={isLoading} shuffledPersonalized={shuffledPersonalized} />
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20 pt-8 sticky bottom-0 bg-background">
        <p className="text-center text-sm text-muted-foreground">
          Powered by NewsAPI, The Guardian, and NY Times
        </p>
      </footer>
    </main>
  );
}
