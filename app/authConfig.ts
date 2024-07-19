import { db } from "@/lib/db";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "exmaple@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials): Promise<any> {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        const { username, password } = credentials;

        try {
          const user = await db.user.findUnique({
            where: {
              username,
            },
          });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
    signOut: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ user, token }: any) => {
      if (user) {
        token.uid = user.id;
        token.email = user.username;
      }
      return token;
    },
    session: ({ session, token, user }: any) => {
      if (session.user) {
        session.user.id = token.uid;
        session.user.email = token.email;
      }
      return session;
    },
  },
};
