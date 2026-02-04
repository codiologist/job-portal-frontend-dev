import { NextRequest, NextResponse } from "next/server";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 },
      );
    }

    // Validate file type
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPG and PNG images are allowed" },
        { status: 400 },
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Image must be less than 1MB" },
        { status: 400 },
      );
    }

    // Convert file to buffer for uploading to your backend
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // TODO: Replace this with your actual backend API call
    // Example:
    // const response = await fetch('YOUR_BACKEND_URL/upload', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': file.type,
    //     'Authorization': `Bearer ${YOUR_API_KEY}`,
    //   },
    //   body: buffer,
    // })
    //
    // if (!response.ok) {
    //   throw new Error('Backend upload failed')
    // }
    //
    // const data = await response.json()
    // return NextResponse.json({ url: data.imageUrl })

    // For demo purposes, we'll simulate a successful upload
    // In production, replace this with actual backend integration
    console.log(
      `Received file: ${file.name}, size: ${file.size} bytes, type: ${file.type}`,
    );

    return NextResponse.json({
      success: true,
      message: "Image uploaded successfully",
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to process upload" },
      { status: 500 },
    );
  }
}
