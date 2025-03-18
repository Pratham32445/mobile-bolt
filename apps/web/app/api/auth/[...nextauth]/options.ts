import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import PrismaClient from "db/client"
import NextAuth from "next-auth"

export const authOptions: AuthOptions = {
    callbacks: {
        async signIn({ profile }) {
            const email = profile?.email;
            const name = profile?.name;
            const user = await PrismaClient.user.findFirst({
                where: {
                    email
                }
            })
            if (!user) {
                await PrismaClient.user.create({
                    data: {
                        email: email!,
                        name: name!
                    }
                })
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                const dbUser = await PrismaClient.user.findFirst({
                    where: {
                        email: user.email!
                    }
                })
                token.id = dbUser?.Id;
            }
            return token;
        },
        session({ session, token }) {
            session.user.id = token.id!;
            return session;
        }
    },
    providers: [
        GoogleProvider({
            clientId: process.env.CLIENT_ID!,
            clientSecret: process.env.CLIENT_SECRET!
        })
    ]
}

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            name?: string
            email?: string
            image?: string
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string
    }
}