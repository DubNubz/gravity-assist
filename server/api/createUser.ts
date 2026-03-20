import { getRandomCharacters } from "~/utils/functions";
import { readDb, writeDb } from "~/server/utils/localDb";

export default defineEventHandler(async () => {
  try {
    const db = readDb();

    // Generate a unique uid
    let uid = getRandomCharacters(12, "numeric");
    while (db.users[uid]) uid = getRandomCharacters(12, "numeric");

    const accessToken = getRandomCharacters(50);
    const now = new Date().toISOString().slice(0, 10);

    const data = {
      uid,
      accessToken,
      createdAt: now,
      lastLoggedIn: now,
      savedMails: [],
      blueprints: [],
      bpLastSaved: null,
      origin: "L"
    };

    db.users[uid] = data;
    writeDb(db);

    return { success: true, error: null, content: data };
  } catch (error) {
    console.error(error);
    return { success: false, error: error instanceof Error ? error.message : "Something went wrong.", content: null };
  }
});
