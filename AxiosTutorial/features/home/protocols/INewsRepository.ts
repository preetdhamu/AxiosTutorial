import { INewsByCategoryRepository } from "./components/INewsByCategoryRepository";
import { ITopHeadlinesRepository } from "./components/ITopHeadlinesRepository";

export type INewsRepository = ITopHeadlinesRepository & INewsByCategoryRepository;