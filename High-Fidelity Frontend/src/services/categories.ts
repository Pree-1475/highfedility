import { apiFetch } from "./api";
import { Category } from "../types";

export async function getCategories(): Promise<Category[]> {
  return apiFetch<Category[]>("categories/");
}
