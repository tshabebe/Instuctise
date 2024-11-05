import { db } from "@/db";
import { section } from "@/db/schema";
import { generateId } from "./id";

async function seedSection() {
  await db.insert(section).values({
    id: generateId(),
    name: "teshome",
    userId: "tobedone userId",
    username: "@teshome",
  });
}

await seedSection();
