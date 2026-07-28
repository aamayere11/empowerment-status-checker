import client from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { nin } = await req.json();

    await client.connect();

    const db = client.db("empowerment");

    const applicant = await db.collection("applicants").findOne({
  NIN: Number(nin),

    });

    console.log("NIN received:", nin);
    console.log("Applicant:", applicant);

    if (!applicant) {
      return NextResponse.json({
        success: false,
        message: "NIN not found",
      });
    }
console.log(Object.keys(applicant));
console.log("Keys:", Object.keys(applicant));
   return NextResponse.json({
  success: true,
  applicant: {
    name: applicant.Name,
   status: applicant["STATUS "],
    gender: applicant.Gender,
    phone: applicant.Phone,
    nin: applicant.NIN,
    lga: applicant.LGA,
  },
});
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
      message: "Server Error",
    });
  }
}