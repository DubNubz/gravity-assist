import { readDb, writeDb } from "~/server/utils/localDb";

interface Body {
  uid: string;
  accessToken: string;
  accountIndex: number;
}

export default defineEventHandler(async (event) => {
  try {
    const body = (await readBody(event)) as Body;
    const db = readDb();
    const userData = db.users[body.uid];

    if (!userData) throw new Error("User not found.");
    if (userData.uid !== body.uid || userData.accessToken !== body.accessToken) throw new Error("Invalid credentials.");

    const existingBlueprints = userData.blueprints as Record<string, Record<number, (string | number)[]>[]>[];
    existingBlueprints.splice(body.accountIndex, 1);

    userData.blueprints = existingBlueprints;
    userData.bpLastSaved = new Date().toISOString().slice(0, 10);
    db.users[body.uid] = userData;
    writeDb(db);

    return { success: true, error: null, newBlueprints: existingBlueprints };
  } catch (error) {
    console.error(error);
    return { success: false, error: error instanceof Error ? error.message : "Something went wrong.", newBlueprints: null };
  }
});
