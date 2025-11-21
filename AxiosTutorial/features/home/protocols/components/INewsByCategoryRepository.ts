import { NewsItem } from "../../models/NewsItem";

export interface INewsByCategoryRepository {
    fetchNewsByCategory(
        category?: string | null,
        page?: string | null
    ): Promise<{ results: NewsItem[]; nextPage?: string | null }>
}