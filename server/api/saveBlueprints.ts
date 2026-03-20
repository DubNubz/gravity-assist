import type { BlueprintAllShip } from "~/utils/blueprints";
import { getObjectValue } from "~/utils/functions";
import { readDb, writeDb } from "~/server/utils/localDb";

interface Body {
  uid: string;
  accessToken: string;
  blueprints: BlueprintAllShip[] | null;
  unassignedTp: [fighter: number, corvette: number, frigate: number, destroyer: number, cruiser: number, battlecruiser: number, auxiliaryShip: number, carrier: number, battleship: number];
  accountIndex: number;
  accountName: string;
}

export default defineEventHandler(async (event) => {
  try {
    const body = (await readBody(event)) as Body;

    if (body.accountIndex > 9) throw new Error("You can only have 10 saved accounts at the moment. Sorry!");

    const db = readDb();
    const userData = db.users[body.uid];

    if (!userData) throw new Error("User not found.");
    if (userData.uid !== body.uid || userData.accessToken !== body.accessToken) throw new Error("Invalid credentials.");

    const existingBlueprints = userData.blueprints as Record<string, Record<number, (string | number)[]>[]>[];
    if (!body.blueprints && !existingBlueprints[body.accountIndex]) throw new Error("Account not saved.");

    const blueprints = !body.blueprints
      ? null
      : (body.blueprints
          .map((ship: any) => {
            if (!ship.unlocked) return { [ship.id]: [] };
            if (!("modules" in ship)) return { [ship.id]: [ship.variant, ship.techPoints] };
            return { [ship.id]: [ship.variant, ship.techPoints, ship.modules.filter((mod: any) => mod.unlocked).map((mod: any) => mod.system)].flat() };
          })
          .filter((obj) => getObjectValue(obj).length > 0) as Record<number, (string | number)[]>[]);

    if (blueprints) blueprints.unshift({ "999": body.unassignedTp });

    existingBlueprints[body.accountIndex] = {
      [body.accountName]: blueprints ? blueprints : getObjectValue(existingBlueprints[body.accountIndex])
    };

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
