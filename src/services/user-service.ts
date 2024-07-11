import { auth } from "@/auth";
import db from "@/db/index";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";

export const getCurrentUser = async () => {
  const session = await auth();

  const userId = session?.user.id || "";

  const user = await db.select().from(users).where(eq(users.id, userId));

  return user[0];
};

export const getUserByEmail = async (email: string) => {
  const user = await db.select().from(users).where(eq(users.email, email));

  return user[0];
};

export const getUserById = async (id: string) => {
  const user = await db.select().from(users).where(eq(users.id, id));

  return user[0];
};

export const setUserDesigner = async (userId: string) => {

    const user = await db.update(users).set({isDesigner: true}).where(eq(users.id, userId)).returning({curId: users.id, updatedDesigner: users.isDesigner});
}
