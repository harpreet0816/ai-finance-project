"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/dist/types/server";
import { revalidatePath } from "next/cache";

const serializeTransaction = (obj) => {
  const serialized = { ...obj };

  if (obj.balance) {
    serialized.balance = obj.balance.toNumber();
  }
};
export async function createAccount(data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // convert balance to float before saving
    const balanceFloat = parseFloat(data.balance);
    if (isNaN(balanceFloat)) {
      throw new Error("Invalid balance amount");
    }

    // check if this is the user's first account
    const existingAccounts = await db.account.findMany({
      where: {
        userId: user.id,
      },
    });

    const shouldBeDefault =
      existingAccounts.length === 0 ? true : data?.isDefault;

    if (shouldBeDefault) {
      await db.account.updateMany({
        where: {
          userId: user.id,
          isDefault: true,
        },
        data: { isDefault: false },
      });
    }

    const account = await db.account.create({
      data: {
        ...data,
        balance: balanceFloat,
        userId: user.id,
        isDefault: shouldBeDefault,
      },
    });
    // ❌ Error: Non-serializable data
    // account contains: A Prisma model object
    // Potentially circular references (Dates, BigInt, etc.)
    //return JSON.parse(JSON.stringify(account)); // Quick fix

    // Server Actions must return serializable data
    const serializedAccount = serializeTransaction(account);

    // Revalidates (refreshes) cached data for a specific Next.js route
    // Needed after DB mutations to update the UI with fresh data because next cache the data for page
    revalidatePath("/dashboard");
    return { success: true, data: serializedAccount };
  } catch (error) {
    throw new Error(error?.message);
  }
}
