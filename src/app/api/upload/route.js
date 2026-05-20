import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // ── Validate file type ──
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPG, PNG, and WebP images are allowed" },
        { status: 400 },
      );
    }

    // ── Validate file size (max 2MB) ──
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size must be under 2MB" },
        { status: 400 },
      );
    }

    // ── Convert file to base64 for Cloudinary ──
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    // ── Upload to Cloudinary ──
    const result = await cloudinary.uploader.upload(base64, {
      folder: "golfngv/avatars",
      public_id: `avatar_${session.user.id}`, // overwrite previous avatar
      overwrite: true,
      transformation: [
        { width: 400, height: 400, crop: "fill", gravity: "face" }, // auto crop to face
        { quality: "auto", fetch_format: "auto" }, // auto compress
      ],
    });

    return NextResponse.json({ url: result.secure_url }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 },
    );
  }
}
