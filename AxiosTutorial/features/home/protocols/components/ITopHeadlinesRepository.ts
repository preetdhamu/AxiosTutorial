import { NewsCache } from "../../models/NewsCache";

export interface ITopHeadlinesRepository {
  fetchTopHeadlines(page?: string | null): Promise<NewsCache>;
}