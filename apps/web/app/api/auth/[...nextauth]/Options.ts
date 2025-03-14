import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import prismaClient from "db/client"

export const authOptions: AuthOptions = {
    pages: {
        signIn: "/sign-in"
    },
    callbacks: {
        async signIn({ profile }) {
            const user = await prismaClient.user.findFirst({
                where: {
                    email: profile?.email
                }
            })
            if (user) return true;
            await prismaClient.user.create({
                data: {
                    email: profile!.email!
                }
            })
            return true;
        }
    },
    providers: [
        GoogleProvider({
            clientId: process.env.CLIENT_ID!,
            clientSecret: process.env.CLIENT_SECRET!
        })
    ]
}
