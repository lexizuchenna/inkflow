import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized", statusCode: 401 },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("image") as File;
    const bucket = (formData.get("bucket") as string) || "stories";

    if (!file) {
      return NextResponse.json(
        { error: "No file provided", statusCode: 400 },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileExtension = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = `${userId}/${fileName}`;

    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: file.name.endsWith(".svg") ? "image/svg+xml" : file.type,
        upsert: false,
      });

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from(bucket).getPublicUrl(filePath);

    return NextResponse.json({
      data: { url: publicUrl, path: data.path },
      message: "Image uploaded successfully",
      status: 200,
    });
  } catch (error: any) {
    console.error("[UPLOAD_ERROR]:", error);
    return NextResponse.json(
      {
        error: "UPLOAD_FAILED",
        message: error.message || "Failed to upload image",
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}
