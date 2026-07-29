import { NextResponse } from "next/server";
import client from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const {
      name,
      nin,
      phone,
      gender,
      lga,
      bankName,
      accountNumber,
      status,
    } = await req.json();

    // Tabbatar an cika dukkan filayen
    if (
      !name ||
      !nin ||
      !phone ||
      !gender ||
      !lga ||
      !bankName ||
      !accountNumber ||
      !status
    ) {
      return NextResponse.json({
        success: false,
        message: "Please fill in all fields.",
      });
    }

    // NIN ya zama digits 11
    if (!/^\d{11}$/.test(nin)) {
      return NextResponse.json({
        success: false,
        message: "NIN must be exactly 11 digits.",
      });
    }

    const db = client.db("empowerment");

    // Duba ko NIN ya riga ya wanzu
    const existing = await db.collection("applicants").findOne({ nin });

    if (existing) {
      return NextResponse.json({
        success: false,
        message: "This NIN already exists.",
      });
    }

    // Adana applicant
    await db.collection("applicants").insertOne({
      name,
      nin,
      phone,
      gender,
      lga,
      bankName,
      accountNumber,
      status,
    });

    return NextResponse.json({
      success: true,
      message: "Applicant added successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
      message: "Server error.",
    });
  }
}