import { NextResponse } from "next/server";
import {
  consentField,
  dateField,
  emailField,
  field,
  readSubmission,
  saveSubmission,
  submissionFailure,
} from "@/lib/submissions";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    const data = await readSubmission(request);
    if (field(data, "website"))
      return NextResponse.json({ reference: "Thank you" });
    const payload = {
      name: field(data, "name", 2, 100),
      email: emailField(data),
      phone: field(data, "phone", 0, 40),
      occasion: field(data, "occasion", 2, 100),
      preferences: field(data, "preferences", 0, 500),
      date: dateField(data),
      message: field(data, "message", 10, 3000),
      consent: consentField(data),
    };
    const reference = await saveSubmission("inquiries", { payload });
    return NextResponse.json({ reference }, { status: 201 });
  } catch (error) {
    return submissionFailure(error);
  }
}
