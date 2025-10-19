import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { updateFilters } from "../store/slices/articlesSlice";
import type { ArticleSource } from "../store/slices/articlesSlice";
import { fetchArticlesThunk } from "../store/thunks/fetchArticlesThunk";
import { Filter, Calendar, Tag, Newspaper, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "./ui/dropdown-menu";

const CATEGORIES = [
  "technology",
  "business",
  "sports",
  "entertainment",
  "health",
  "science",
  "politics",
  "world",
];

const SOURCES: { id: ArticleSource; label: string }[] = [
  { id: "newsapi", label: "NewsAPI" },
  { id: "guardian", label: "The Guardian" },
  { id: "nytimes", label: "NY Times" },
];

export default function FilterDropdown() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((s) => s.articles.filters);
  const [dateFrom, setDateFrom] = useState(filters.dateFrom ?? "");
  const [dateTo, setDateTo] = useState(filters.dateTo ?? "");

  const toggleCategory = (category: string) => {
    const current = filters.categories;
    const updated = current.includes(category)
      ? current.filter((c) => c !== category)
      : [...current, category];
    dispatch(updateFilters({ categories: updated }));
    dispatch(fetchArticlesThunk());
  };

  const toggleSource = (sourceId: ArticleSource) => {
    const current = filters.sources;
    const updated = current.includes(sourceId)
      ? current.filter((s) => s !== sourceId)
      : [...current, sourceId];
    dispatch(updateFilters({ sources: updated }));
    dispatch(fetchArticlesThunk());
  };

  const applyDateFilter = () => {
    dispatch(
      updateFilters({
        dateFrom: dateFrom || undefined,
        dateTo: dateTo || undefined,
      })
    );
    dispatch(fetchArticlesThunk());
  };

  const removeFilter = (
    type: "dateFrom" | "dateTo" | "category" | "source",
    value?: ArticleSource | string
  ) => {
    if (type === "dateFrom") {
      setDateFrom("");
      dispatch(updateFilters({ dateFrom: undefined }));
    } else if (type === "dateTo") {
      setDateTo("");
      dispatch(updateFilters({ dateTo: undefined }));
    } else if (type === "category" && value) {
      toggleCategory(value);
      return;
    } else if (type === "source" && value) {
      // narrow to ArticleSource
      toggleSource(value as ArticleSource);
      return;
    }
    dispatch(fetchArticlesThunk());
  };

  const activeFilterCount =
    filters.categories.length +
    filters.sources.length +
    (filters.dateFrom ? 1 : 0) +
    (filters.dateTo ? 1 : 0);

  return (
    <div className="relative flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-1.5 px-4 py-2.5 bg-background border border-input rounded-xl hover:bg-accent transition-colors font-medium text-foreground shadow-sm text-sm order-2">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-primary text-primary-foreground rounded-full text-[10px] font-semibold">
                {activeFilterCount}
              </span>
            )}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          sideOffset={6}
          className="w-[min(90vw,20rem)] sm:w-80 p-4 space-y-4 bg-card border border-border rounded-lg shadow-lg"
        >
          {/* Date Range */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-2">
              <Calendar className="w-4 h-4" />
              Date Range
            </label>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">
                  From
                </label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  onBlur={applyDateFilter}
                  className="w-full px-2.5 py-2 bg-background border border-input rounded-lg text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">
                  To
                </label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  onBlur={applyDateFilter}
                  className="w-full px-2.5 py-2 bg-background border border-input rounded-lg text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-2">
              <Tag className="w-4 h-4" />
              Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all capitalize ${
                    filters.categories.includes(category)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Sources */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-2">
              <Newspaper className="w-4 h-4" />
              Sources
            </label>
            <div className="flex flex-wrap gap-2">
              {SOURCES.map((source) => (
                <button
                  key={source.id}
                  onClick={() => toggleSource(source.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                    filters.sources.includes(source.id)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {source.label}
                </button>
              ))}
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Active Filter Pills - shown on md+ */}
      {activeFilterCount > 0 && (
        <div className="hidden md:flex gap-2 items-center order-1">
          {filters.dateFrom && (
            <div className="flex items-center gap-1 px-2.5 py-1.5 bg-primary/10 text-primary rounded-full text-[11px] font-medium">
              <span>From: {filters.dateFrom}</span>
              <button
                onClick={() => removeFilter("dateFrom")}
                className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          {filters.dateTo && (
            <div className="flex items-center gap-1 px-2.5 py-1.5 bg-primary/10 text-primary rounded-full text-[11px] font-medium">
              <span>To: {filters.dateTo}</span>
              <button
                onClick={() => removeFilter("dateTo")}
                className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          {filters.categories.map((category) => (
            <div
              key={category}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-primary/10 text-primary rounded-full text-[11px] font-medium capitalize"
            >
              <span>{category}</span>
              <button
                onClick={() => removeFilter("category", category)}
                className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          {filters.sources.map((source) => (
            <div
              key={source}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-primary/10 text-primary rounded-full text-[11px] font-medium"
            >
              <span>{SOURCES.find((s) => s.id === source)?.label}</span>
              <button
                onClick={() => removeFilter("source", source)}
                className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
