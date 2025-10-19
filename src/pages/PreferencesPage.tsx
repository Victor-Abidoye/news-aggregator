import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/useRedux"
import { setPreferredAuthors, setPreferredCategories, setPreferredSources } from "../store/slices/preferencesSlice"
import { Settings, Save, User, Tag, Newspaper, ArrowLeft } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

export default function PreferencesPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const prefs = useAppSelector((s) => s.preferences)

  const [sources, setSources] = useState(prefs.preferredSources.join(", "))
  const [categories, setCategories] = useState(prefs.preferredCategories.join(", "))
  const [authors, setAuthors] = useState(prefs.preferredAuthors.join(", "))

  const save = () => {
    const s = sources
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean) as any
    const c = categories
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean)
    const a = authors
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean)
    dispatch(setPreferredSources(s))
    dispatch(setPreferredCategories(c))
    dispatch(setPreferredAuthors(a))
    navigate("/")
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to News
      </Link>

      <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <Settings className="w-8 h-8 text-foreground" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Your Preferences</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Customize your news feed to see content that matters to you
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              <Newspaper className="w-4 h-4 inline mr-1.5" />
              Preferred Sources
            </label>
            <input
              type="text"
              placeholder="e.g., newsapi, guardian, nytimes"
              value={sources}
              onChange={(e) => setSources(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
            <p className="text-xs text-muted-foreground mt-2">Comma-separated list of sources</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              <Tag className="w-4 h-4 inline mr-1.5" />
              Preferred Categories
            </label>
            <input
              type="text"
              placeholder="e.g., technology, business, sports"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
            <p className="text-xs text-muted-foreground mt-2">Comma-separated list of categories</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              <User className="w-4 h-4 inline mr-1.5" />
              Preferred Authors
            </label>
            <input
              type="text"
              placeholder="e.g., John Doe, Jane Smith"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
            <p className="text-xs text-muted-foreground mt-2">Comma-separated list of author names</p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={save}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              <Save className="w-4 h-4" />
              Save Preferences
            </button>
            <Link
              to="/"
              className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors flex items-center justify-center"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
