export interface NewsItem {
  article_id: string;
  title: string;
  description: string;
  image_url: string | null;
  link: string;
  pubDate: string;
  source_name: string;
  category: string[];
}

export interface NewsCache {
  status: string;
  totalResults: number;
  results: NewsItem[];
  nextPage?: string;
  cachedAt: number;
}