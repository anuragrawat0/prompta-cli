import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config({
  path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../.env"),
});

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../generated/prisma/client.js";

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;
if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw new Error("Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET in environment");
}

const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),
    basePath: "/api/auth",
    trustedOrigins:["http://localhost:3000"],
    socialProviders:{
        github:{
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
        }
    }
});