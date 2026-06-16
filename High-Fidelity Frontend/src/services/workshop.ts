import { apiFetch } from "./api";
import { WorkshopData } from "../types";

export async function getWorkshopData(): Promise<WorkshopData> {
  return apiFetch<WorkshopData>("workshop/");
}
