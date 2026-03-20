import { getRandomCharacters, truncateOps, untruncateOps } from "~/utils/functions";
import type { SaveTemplate, TruncatedOp } from "~/utils/types";
import { readDb, writeDb } from "~/server/utils/localDb";

interface Body {
  uid: string;
  accessToken: string;
  template: SaveTemplate;
}

export default defineEventHandler(async (event) => {
  try {
    const body = (await readBody(event)) as Body;
    const db = readDb();
    const userData = db.users[body.uid];

    if (!userData) throw new Error("User not found.");
    if (userData.uid !== body.uid || userData.accessToken !== body.accessToken) throw new Error("Invalid credentials.");

    const template = body.template;
    if (!template.ops.every((op) => "insert" in op)) throw new Error("Invalid ops.");
    if (template.name.length > 50) throw new Error("Names can only be 50 characters long.");

    const savedMails = userData.savedMails;
    if (savedMails.length >= 30) throw new Error("You can only have 30 saved mails. Try deleting some.");

    const namespaceCollision = savedMails.findIndex((mail) => mail.name === template.name);
    const isSame = namespaceCollision !== -1;

    const id = isSame ? savedMails[namespaceCollision].id : getRandomCharacters(10);
    template.id = id;
    template.createdAt = isSame ? savedMails[namespaceCollision].createdAt : new Date().toISOString().slice(0, 10);
    template.lastSaved = new Date().toISOString().slice(0, 10);

    if (isSame) savedMails.splice(namespaceCollision, 1);

    // Build the untruncated copy to return
    const savedMailsCopy = JSON.parse(JSON.stringify(savedMails)) as SaveTemplate[];
    savedMailsCopy.forEach((mail) => (mail.ops = untruncateOps(mail.ops as TruncatedOp[])));
    const newMail = JSON.parse(JSON.stringify(template)) as SaveTemplate;
    savedMailsCopy.unshift(newMail);

    // Condense for storage
    template.ops = truncateOps(template.ops);
    savedMails.unshift(template);

    userData.savedMails = savedMails;
    db.users[body.uid] = userData;
    writeDb(db);

    return { success: true, error: null, content: newMail, outcomeMails: savedMailsCopy };
  } catch (error) {
    console.error(error);
    return { success: false, error: error instanceof Error ? error.message : "Something went wrong.", content: null, outcomeMails: null };
  }
});
