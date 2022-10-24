import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { pocketBase } from "../../../services/pocketBaseService";

export const authOptions = {
  // Configure one or more authentication providers
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const pocketBaseUser = await pocketBase.client.users.authViaEmail(
          credentials!.email,
          credentials!.password
        );

        console.log("Pocketbase token", pocketBaseUser.token);
        const user = {
          id: pocketBaseUser.user.id,
          name: pocketBaseUser.user.profile?.name,
          email: credentials!.email,
          token: pocketBaseUser.token,
          user: pocketBaseUser.user,
        };
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }: any) {
      if (user) {
        token.accessToken = user.token;
        token.user = user.user;
      }
      return token;
    },
    async session({ session, token, user }: any) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
};

export default NextAuth(authOptions);
