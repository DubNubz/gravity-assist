import { untruncateOps } from "~/utils/functions";
import type { SaveTemplate, TruncatedOp } from "~/utils/types";
import { readDb } from "~/server/utils/localDb";

interface Body {
  uid: string;
  mailId: string;
}

export default defineEventHandler(async (event) => {
  try {
    const body = (await readBody(event)) as Body;
    const db = readDb();
    const userData = db.users[body.uid];

    if (!userData) throw new Error("User not found.");

    const foundMail = userData.savedMails.find((mail) => mail.id === body.mailId);
    if (!foundMail) throw new Error("Mail not found.");

    const mail = JSON.parse(JSON.stringify(foundMail)) as SaveTemplate;
    mail.ops = untruncateOps(mail.ops as TruncatedOp[]);

    return { success: true, error: null, content: mail };
  } catch (error) {
    console.error(error);
    return { success: false, error: error instanceof Error ? error.message : "Something went wrong.", content: null };
  }
});
