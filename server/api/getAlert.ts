import type { Alert } from "~/utils/types";

// Local-only mode: no alerts from database.
export default defineEventHandler((): { success: boolean; error: string | null; content: Alert | null } => {
  return { success: false, error: "No alerts in local mode.", content: null };
});
