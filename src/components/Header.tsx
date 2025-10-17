import { Newspaper, Settings, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const isPreferencesPage = location.pathname === "/preferences";

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Newspaper className="w-8 h-8 text-foreground" />
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">
                NewsHub
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Your personalized news aggregator from multiple trusted sources
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
              <User className="w-5 h-5 text-foreground" />
            </button>
            <Link
              to="/preferences"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isPreferencesPage
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Preferences</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
