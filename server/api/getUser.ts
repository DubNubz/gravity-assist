import { untruncateOps } from "~/utils/functions";
import type { TruncatedOp, UserData } from "~/utils/types";
import { readDb, writeDb } from "~/server/utils/localDb";

interface Body {
  uid: string;
  accessToken: string;
  updateOrigin: boolean;
}

export default defineEventHandler(async (event): Promise<{ success: boolean; error: string | null; content: UserData | null }> => {
  try {
    const body = (await readBody(event)) as Body;
    const db = readDb();
    const userData = db.users[body.uid];

    if (!userData) throw new Error("User not found.");
    if (userData.uid !== body.uid || userData.accessToken !== body.accessToken) throw new Error("Invalid credentials.");

    userData.lastLoggedIn = new Date().toISOString().slice(0, 10);
    db.users[body.uid] = userData;
    writeDb(db);

    // Return a copy with untruncated mail ops
    const returnData = JSON.parse(JSON.stringify(userData));
    returnData.savedMails.forEach((mail: any) => (mail.ops = untruncateOps(mail.ops as TruncatedOp[])));

    return { success: true, error: null, content: returnData };
  } catch (error) {
    console.error(error);
    return { success: false, error: error instanceof Error ? error.message : "Something went wrong.", content: null };
  }
});
