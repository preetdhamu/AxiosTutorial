import { NewsItem } from "./NewsItem";

export interface CategoryNews {
  results: NewsItem[];
  nextPage?: string | null;
}