// @ts-nocheck

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prismadb"


export const authOptions: any = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
    ],
    session: {
        strategy: 'database'
    },
    callbacks: {
        async session({ session, token, user }) {
            session.user = user;

            return session
        }
    }
}


export default NextAuth(authOptions);