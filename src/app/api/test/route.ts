import client from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await client.connect();

    return NextResponse.json({
      success: true,
      message: "MongoDB Connected Successfully!",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Connection Failed",
      error,
    });
  }
}