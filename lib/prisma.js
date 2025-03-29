import { PrismaClient } from "@prisma/client";

export const db = globalThis.prisma || new PrismaClient;

if ( process.env.NODE_ENV !== "production" ){
    globalThis.prisma = db;
}

db.$connect()
    .then(() => console.log("✅ Database connected successfully!"))
    .catch((err) => console.log("❌ Database connection failed:", err));

// globalThis.prisma: This global varaible ensures that prisma client instance is reused across hot reloads during developement . without this, each time your application reloads , a new instance of the prisme client would be created , potentially leading to connection issue.