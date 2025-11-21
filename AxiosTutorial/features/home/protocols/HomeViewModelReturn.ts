import { RefObject } from "react";
import { ScrollView } from "react-native";
import { NewsCache } from "../models/NewsCache";
import { NewsItem } from "../models/NewsItem";


export interface HomeViewModelReturn {
  scrollRef: RefObject<ScrollView | null >;
  topHeadlines: NewsCache | null;
  categoryData: NewsCache | undefined;
  items: NewsItem[];
  error: string | null;
  activeTab: string;
  clearError : () => void;
  setActiveTab: (tab: string) => void;
  loadingMore: boolean;
  refreshing: boolean;
  loadTopNews: () => Promise<void>;
  loadMoreTopNews : () => Promise<void> ;
  loadCategoryNews: (isLoadMore?: boolean) => Promise<void>;
  onRefresh: () => Promise<void>;
  handleEndReached: () => void;
  handleTabPress: (tab: string, index: number) => void;
}
