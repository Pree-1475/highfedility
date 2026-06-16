import { apiFetch } from "./api";
import { BusinessSettingsData } from "../types";

export async function getBusinessSettings(): Promise<BusinessSettingsData> {
  return apiFetch<BusinessSettingsData>("business-settings/");
}
