import { untruncateOps } from "~/utils/functions";
import type { SaveTemplate, TruncatedOp } from "~/utils/types";
import { readDb, writeDb } from "~/server/utils/localDb";

interface Body {
  uid: string;
  accessToken: string;
  mailId: string;
}

export default defineEventHandler(async (event) => {
  try {
    const body = (await readBody(event)) as Body;
    const db = readDb();
    const userData = db.users[body.uid];

    if (!userData) throw new Error("User not found.");
    if (userData.uid !== body.uid || userData.accessToken !== body.accessToken) throw new Error("Invalid credentials.");

    const savedMails = userData.savedMails;
    const mailIndex = savedMails.findIndex((mail) => mail.id === body.mailId);
    if (mailIndex === -1) throw new Error("Mail not found.");

    savedMails.splice(mailIndex, 1);
    userData.savedMails = savedMails;
    db.users[body.uid] = userData;
    writeDb(db);

    // Return untruncated copy
    const outcomeMails = JSON.parse(JSON.stringify(savedMails)) as SaveTemplate[];
    outcomeMails.forEach((mail) => (mail.ops = untruncateOps(mail.ops as TruncatedOp[])));

    return { success: true, error: null, content: outcomeMails };
  } catch (error) {
    console.error(error);
    return { success: false, error: error instanceof Error ? error.message : "Something went wrong.", content: null };
  }
});
