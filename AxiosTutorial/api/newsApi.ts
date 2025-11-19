import apiClient from "./apiClient";
// https://newsdata.io/api/1/latest?apikey=pub_39e8xvssfsfsfdds8c71eab446ce96858705b2695309&q=pizza
// Top headlines

interface HeadlineProps {
  page?:string | number | null ;
}
export const getTopHeadLines = ({ page } : HeadlineProps) => {
  
  return apiClient.get("/latest", {
    params: {
      country: "in",
      language: "en",
      ...(page ? {page} : {})
    },
  });
};



interface CategoryParams {
  category?: string | null;
  page?: string | number | null;
}

// https://newsdata.io/api/1/news?apikey=pub_39esdfsdfdsff88c71eab446ce96858705b2695309&category=health&country=in&language=en
// Category news
export const getNewsByCategory = ({ category, page }: CategoryParams) => {

  return apiClient.get("/news", {
    params: {
      country: "in",
      language: "en",
      ...(category && category!=='All' ? { category} : {}),
      ...(page ? {page} : {})
    },
  });
};
