import client from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { nin } = await req.json();

    await client.connect();

    const db = client.db("empowerment");

    const applicant = await db.collection("applicants").findOne({
  nin: nin,

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
   name: applicant.name,
status: applicant.status,
gender: applicant.gender,
phone: applicant.phone,
nin: applicant.nin,
lga: applicant.lga,
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