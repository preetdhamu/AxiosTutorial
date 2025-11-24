// newsSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewsCache } from "../../../features/home/models/NewsCache";
import { NewsItem } from "../../../features/home/models/NewsItem";


interface NewsState {
  topHeadlines: NewsCache | null;
  categories: Record<string, NewsCache>;
  lastUpdatedTop: number | null;
  lastUpdatedCategory: Record<string, number>;
}

export const initialState: NewsState = {
  topHeadlines: null,
  categories: {},
  lastUpdatedTop: null,
  lastUpdatedCategory: {},
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setTopHeadlines: (state, action: PayloadAction<NewsCache & { isRefresh?: boolean }>) => {
      const newData = action.payload;
      const isRefresh = newData.isRefresh ?? false;
      if (!state.topHeadlines || isRefresh) {
        state.topHeadlines = newData;
      } else {
        state.topHeadlines.results.push(...newData.results);
        state.topHeadlines.nextPage = newData.nextPage;
        state.topHeadlines.totalResults = newData.totalResults;
        state.topHeadlines.cachedAt = Date.now();
      }
      state.lastUpdatedTop = Date.now();
    },

    setCategoryNews: (
      state,
      action: PayloadAction<{ category: string; results: NewsItem[]; nextPage?: string | null; isRefresh?: boolean; }>
    ) => {

      const { category, results, nextPage, isRefresh } = action.payload;

      console.log("State is : inside the Before Set Category ?>>>>>>", state);
      if (!state.categories[category] || isRefresh) {
        state.categories[category] = {
          status: "success",
          totalResults: results.length,
          results: results,
          nextPage: nextPage,
          cachedAt: Date.now(),
        }
      } else {
        state.categories[category].results.push(...results);
        state.categories[category].nextPage = nextPage;
        state.categories[category].totalResults += results.length;
        state.categories[category].cachedAt = Date.now();
      }
      state.lastUpdatedCategory[category] = Date.now();
      console.log("State is : inside the After Set Category ?>>>>>>", state);
    },
  },
});

export const { setTopHeadlines, setCategoryNews } = newsSlice.actions;
export default newsSlice.reducer;
