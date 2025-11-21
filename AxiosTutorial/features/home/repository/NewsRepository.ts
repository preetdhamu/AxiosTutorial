import { getNewsByCategory, getTopHeadLines } from "../../../api/newsApi";
import { INewsRepository } from "../protocols/INewsRepository";

export const NewsRepository : INewsRepository  = {
  fetchTopHeadlines : async (page = null) => {
    const response = await getTopHeadLines({ page });
    const data = response.data;
    return {
        status: data.status,
      totalResults: data.totalResults,
      results: data.results,
      nextPage: data.nextPage,
      cachedAt: Date.now(),
    };
  },

  fetchNewsByCategory: async (category = null, page = null) => {
    const response = await getNewsByCategory({ category, page });
    return { results: response.data.results, nextPage: response.data.nextPage };
  },

}