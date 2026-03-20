import { getObjectKey, getObjectValue } from "~/utils/functions";
import { readDb } from "~/server/utils/localDb";

interface Body {
  uid: string;
  accountIndex: number;
}

export default defineEventHandler(async (event) => {
  try {
    const body = (await readBody(event)) as Body;
    const db = readDb();
    const userData = db.users[body.uid];

    if (!userData) throw new Error("User not found.");
    if (!userData.bpLastSaved || userData.blueprints[body.accountIndex] === undefined || (getObjectValue(userData.blueprints[body.accountIndex]) as Record<number, (string | number)[]>[]).length === 0)
      throw new Error("No blueprints found.");

    const accountName = getObjectKey(userData.blueprints[body.accountIndex]);
    const ships = [...(getObjectValue(userData.blueprints[body.accountIndex]) as Record<number, (string | number)[]>[])];

    let unassignedTp: number[] | null = null;
    if (Number(getObjectKey(ships[0])) === 999) {
      const [unassignedEntry] = ships.splice(0, 1);
      unassignedTp = getObjectValue(unassignedEntry) as number[];
    }

    const blueprints = ships.map((ship) => [Number(getObjectKey(ship)), getObjectValue(ship)].flat());

    return { success: true, error: null, content: blueprints, lastSaved: userData.bpLastSaved, accountName, unassignedTp };
  } catch (error) {
    console.error(error);
    return { success: false, error: error instanceof Error ? error.message : "Something went wrong.", content: null, lastSaved: null, accountName: null, unassignedTp: null };
  }
});
