import type React from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { updateFilters } from "../store/slices/articlesSlice";
import { fetchArticlesThunk } from "../store/thunks/fetchArticlesThunk";
import { Search } from "lucide-react";

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((s) => s.articles.filters);
  const [keyword, setKeyword] = useState(filters.keyword);

  const onSearch = () => {
    dispatch(updateFilters({ keyword }));
    dispatch(fetchArticlesThunk());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full">
      <div className="sm:flex-1 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search for news by keyword..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full pl-10 pr-3 py-2.5 bg-background border border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all text-sm"
        />
      </div>
      <button
        onClick={onSearch}
        className="w-full sm:w-auto px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 whitespace-nowrap shadow-sm text-sm"
      >
        <Search className="w-4 h-4" />
        Search
      </button>
    </div>
  );
}
