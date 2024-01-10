import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/libs/db";
import bcrypt from "bcrypt";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const userFound = await db.user.findUnique({
          where: { email },
        });
        if (!userFound) throw new Error("User not found");

        const passwordMatch = await bcrypt.compare(
          password,
          userFound.password
        );
        if (!passwordMatch) throw new Error("Password not match");
        return {
          id: userFound.id,
          email: userFound.email,
          name: userFound.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  }
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
