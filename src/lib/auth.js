import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "./db";
import User from "@/models/User";

const REMEMBER_MAX_AGE = 30 * 24 * 60 * 60; // 30 days
const NO_REMEMBER_MAX_AGE = 60 * 60; // 1 hour (effectively session-only)

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        remember: { label: "Remember Me", type: "text" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        await connectDB();

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

        return {
          id: user._id.toString(),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          bio: user.bio,
          membershipType: user.membershipType,
          avatar: user.avatar,
          createdAt: user.createdAt?.toISOString(),
          // Pass remember flag through so jwt callback can set maxAge
          remember: credentials.remember === "true",
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // ── On first sign in ──
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.phone = user.phone;
        token.bio = user.bio;
        token.membershipType = user.membershipType;
        token.avatar = user.avatar;
        token.createdAt = user.createdAt;
        token.remember = user.remember;

        // Set expiry based on remember me
        token.maxAge = user.remember ? REMEMBER_MAX_AGE : NO_REMEMBER_MAX_AGE;
      }

      // ── Handle profile update() calls from the client ──
      if (trigger === "update" && session) {
        if (session.firstName) token.firstName = session.firstName;
        if (session.lastName) token.lastName = session.lastName;
        if (session.phone) token.phone = session.phone;
        if (session.bio !== undefined) token.bio = session.bio;
        if (session.avatar !== undefined) token.avatar = session.avatar;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.phone = token.phone;
        session.user.bio = token.bio;
        session.user.membershipType = token.membershipType;
        session.user.avatar = token.avatar;
        session.user.createdAt = token.createdAt;
        session.user.remember = token.remember;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: REMEMBER_MAX_AGE, // default — overridden per-token above
  },

  secret: process.env.NEXTAUTH_SECRET,
});
