import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve } from "path";

export interface LocalDbUser {
  uid: string;
  accessToken: string;
  createdAt: string;
  lastLoggedIn: string;
  savedMails: Record<string, any>[];
  blueprints: Record<string, Record<string, (string | number)[]>[]>[];
  bpLastSaved: string | null;
  origin: string;
}

export interface LocalDb {
  users: Record<string, LocalDbUser>;
}

const DATA_DIR = resolve(process.cwd(), ".local-data");
const DB_FILE = resolve(DATA_DIR, "db.json");

export function readDb(): LocalDb {
  try {
    if (!existsSync(DB_FILE)) return { users: {} };
    return JSON.parse(readFileSync(DB_FILE, "utf-8")) as LocalDb;
  } catch {
    return { users: {} };
  }
}

export function writeDb(db: LocalDb): void {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf-8");
}
