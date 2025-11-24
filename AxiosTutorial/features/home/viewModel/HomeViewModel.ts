// viewModel/newsViewModel.ts
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { getNewsByCategory, getTopHeadLines } from "../../../api/newsApi";
import { NewsCache } from "../models/NewsCache";
import { setCategoryNews, setTopHeadlines } from "../../../store/slices/home/newsSlice";
import { ScrollView } from "react-native";
import { HomeViewModelReturn } from "../protocols/HomeViewModelReturn";



export const tabs = [
    "All",
    "Business",
    "Crime",
    "Domestic",
    "Education",
    "Entertainment",
    "Environment",
    "Food",
    "Health",
    "Lifestyle",
    "Science",
    "Sports",
    "Technology",
    "Top",
    "Tourism",
    "World",
];



export const useNewsViewModel = (): HomeViewModelReturn => {

    const dispatch = useDispatch();
    const [loadingMore, setLoadingMore] = useState(false);

    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [activeTab, setActiveTab] = useState<string>('All');
    const topHeadlines = useSelector((state: RootState) => state.news.topHeadlines);
    const categoryData = useSelector(
        (state: RootState) => state.news.categories[activeTab]
    );
    const items = categoryData?.results ?? [];
    const nextPageToken = categoryData?.nextPage ?? null;
    const nextPageTokenInTopHeadlines = topHeadlines?.nextPage ?? null;

    const scrollRef = useRef<ScrollView | null>(null);



    useEffect(() => {
        const index = tabs.indexOf(activeTab);
        if (index >= 0) {
            setTimeout(() => {
                scrollRef.current?.scrollTo({ x: index * 80 - 20, animated: true });
            }, 100);
        }
    }, [activeTab]);


    useEffect(() => {
        if (!categoryData) loadCategoryNews(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);



    useEffect(() => {
        if (!topHeadlines?.results.length) loadTopNews();
        console.log("Top Headline : ", topHeadlines, "Categories News ", categoryData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const loadMoreTopNews = useCallback(async () => {
        if (!nextPageTokenInTopHeadlines || loadingMore) return;

        setLoadingMore(true);
        try {
            const response = await getTopHeadLines({ page: nextPageTokenInTopHeadlines });
            const data = response.data;

            dispatch(
                setTopHeadlines({
                    status: data.status,
                    totalResults: data.totalResults,
                    results: data.results,
                    nextPage: data.nextPage,
                    cachedAt: Date.now(),
                })
            );
        } catch (err: any) {
            console.log("Error loading more top headlines:", err);
            setError(err.message || "Failed to load top headlines");
        } finally {
            setLoadingMore(false);
        }
    }, [
        dispatch,
        nextPageTokenInTopHeadlines,
        loadingMore
    ]);




    const loadTopNews = useCallback(async (isReferesh: boolean = false) => {
        try {
            const response = await getTopHeadLines({ page: null });
            const data = response.data;
            const formatted: NewsCache = {
                status: data.status,
                totalResults: data.totalResults,
                results: data.results,
                nextPage: data.nextPage,
                cachedAt: Date.now(),
            };
            dispatch(setTopHeadlines({ ...formatted, isRefresh: isReferesh }));
        } catch (err: any) {
            console.log("Error loading top headlines", err);
            setError(err.message || "Failed to load top headlines");
        }
    }, [dispatch]);

    const handleTabPress = (tab: string, index: number) => {
        setActiveTab(tab);
        scrollRef.current?.scrollTo({ x: index * 80 - 60, animated: true });
    };


    const loadCategoryNews = useCallback(
        async (isLoadMore = false, isRefersh = false) => {
            if (loadingMore) return;
            if (isLoadMore && !nextPageToken) return;

            setLoadingMore(true);
            try {
                const response = await getNewsByCategory({
                    category: activeTab === "All" ? null : activeTab.toLowerCase(),
                    page: isLoadMore ? nextPageToken : null,
                });

                dispatch(
                    setCategoryNews({
                        category: activeTab,
                        results: response.data.results,
                        nextPage: response.data.nextPage,
                        isRefresh: isRefersh
                    })
                );
            } catch (err: any) {
                console.log("Category load error:", err);
                setError(
                    err.message || "Something went wrong while fetching category news."
                );
            } finally {
                setLoadingMore(false);
            }
        },
        [activeTab, dispatch, loadingMore, nextPageToken]
    );


    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await Promise.all([loadTopNews(true), loadCategoryNews(false, true)]);
        setRefreshing(false);
    }, [loadTopNews, loadCategoryNews]);


    const handleEndReached = useCallback(() => {
        if (loadingMore) return;
        if (!nextPageToken) return;
        loadCategoryNews(true);
    }, [loadingMore, loadCategoryNews, nextPageToken]);

    const clearError = () => {
        setError(null);
    };


    return {
        scrollRef,
        topHeadlines,
        categoryData,
        items,
        error,
        clearError,
        activeTab,
        setActiveTab,
        loadingMore,
        refreshing,
        loadTopNews,
        loadMoreTopNews,
        loadCategoryNews,
        onRefresh,
        handleEndReached,
        handleTabPress
    };
};
