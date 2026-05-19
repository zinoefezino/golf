import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import User from "@/models/User";

// ── Validation ──
const ProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone is required"),
  bio: z.string().optional().default(""),
  avatar: z.string().optional().default(""),
});

// ── PATCH: update profile ──
export async function PATCH(req) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }

    const body = await req.json();

    const parsed = ProfileSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 },
      );
    }

    await connectDB();

    const updated = await User.findByIdAndUpdate(
      session.user.id,
      {
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        phone: parsed.data.phone,
        bio: parsed.data.bio,
        avatar: parsed.data.avatar,
      },
      { new: true }, // return the updated document
    );

    return NextResponse.json(
      {
        message: "Profile updated",
        user: {
          id: updated._id.toString(),
          firstName: updated.firstName,
          lastName: updated.lastName,
          email: updated.email,
          phone: updated.phone,
          bio: updated.bio,
          avatar: updated.avatar,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("PATCH profile error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 },
    );
  }
}
