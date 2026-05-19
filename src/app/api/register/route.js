import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import connectDB from "@/lib/db";
import User from "@/models/User";

// ── Validation schema ──
const RegisterSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(1, "Phone is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  membershipType: z.enum(["public", "member", "premium"]).default("public"),
});

export async function POST(req) {
  try {
    const body = await req.json();

    // ── Validate ──
    const parsed = RegisterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 },
      );
    }

    const { firstName, lastName, email, phone, password, membershipType } =
      parsed.data;

    await connectDB();

    // ── Check if email already exists ──
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 },
      );
    }

    // ── Hash password ──
    const hashedPassword = await bcrypt.hash(password, 12);

    // ── Create user ──
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword,
      membershipType,
    });

    // ── Return user without password ──
    return NextResponse.json(
      {
        message: "Account created successfully",
        user: {
          id: user._id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          membershipType: user.membershipType,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
