import { NextResponse } from "next/server";
import {
  consentField,
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
    if (field(data, "website")) return NextResponse.json({ saved: true });
    const reference = await saveSubmission("newsletter", {
      payload: { email: emailField(data), consent: consentField(data) },
    });
    return NextResponse.json({ reference }, { status: 201 });
  } catch (error) {
    return submissionFailure(error);
  }
}
