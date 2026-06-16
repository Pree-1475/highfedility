import { apiFetch } from "./api";
import { Product } from "../types";

export async function getProducts(params?: { category?: string; type?: string }): Promise<Product[]> {
  let endpoint = "products/";
  const queryParts: string[] = [];
  if (params?.category) {
    queryParts.push(`category=${encodeURIComponent(params.category)}`);
  }
  if (params?.type) {
    queryParts.push(`type=${encodeURIComponent(params.type)}`);
  }
  if (queryParts.length > 0) {
    endpoint += `?${queryParts.join("&")}`;
  }
  return apiFetch<Product[]>(endpoint);
}
