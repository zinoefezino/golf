import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "./db";
import User from "@/models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        await connectDB();

        // Find user — explicitly include password (select: false by default)
        const user = await User.findOne({
          email: credentials.email.toLowerCase(),
        }).select("+password");

        if (!user) {
          throw new Error("No account found with that email");
        }

        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isMatch) {
          throw new Error("Invalid password");
        }

        // Return the object that gets stored in the session token
        return {
          id: user._id.toString(),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          membershipType: user.membershipType,
          avatar: user.avatar,
          createdAt: user.createdAt?.toISOString(),
        };
      },
    }),
  ],

  callbacks: {
    // ── Add extra fields to the JWT token ──
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.membershipType = user.membershipType;
        token.avatar = user.avatar;
        token.createdAt = user.createdAt;
      }
      return token;
    },

    // ── Expose token fields on the session object ──
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.membershipType = token.membershipType;
        session.user.avatar = token.avatar;
        session.user.createdAt = token.createdAt;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login", // auth errors redirect here
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
});
