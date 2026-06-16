import { apiFetch } from "./api";
import { HomePageData } from "../types";

export async function getHomepageData(): Promise<HomePageData> {
  return apiFetch<HomePageData>("homepage/");
}
