import { apiFetch } from "./api";
import { Brand } from "../types";

export async function getBrands(): Promise<Brand[]> {
  return apiFetch<Brand[]>("brands/");
}
