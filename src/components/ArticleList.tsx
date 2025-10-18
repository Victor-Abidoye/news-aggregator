"use client"

import ArticleCard from "./ArticleCard"
import type { Article } from "../store/slices/articlesSlice"

export default function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </>
  )
}
