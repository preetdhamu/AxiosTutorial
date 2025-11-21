import { NewsItem } from "./NewsItem";

export interface NewsCache {
  status: string;
  totalResults: number;
  results: NewsItem[];
  nextPage?: string | null;
  cachedAt: number;
}