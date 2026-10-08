import { NextResponse } from "next/server";
import { getProduct } from "@/lib/catalog";
import {
  consentField,
  dateField,
  emailField,
  field,
  readSubmission,
  saveSubmission,
  submissionFailure,
  SubmissionError,
} from "@/lib/submissions";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    const data = await readSubmission(request);
    if (field(data, "website"))
      return NextResponse.json({ reference: "Thank you" });
    if (
      !Array.isArray(data.items) ||
      !data.items.length ||
      data.items.length > 30
    )
      throw new SubmissionError("Please check the bouquets in your bag.");
    const items = data.items.map((raw: unknown) => {
      if (!raw || typeof raw !== "object" || Array.isArray(raw))
        throw new SubmissionError("Invalid bouquet in your bag.");
      const item = raw as Record<string, unknown>;
      const slug = field(item, "slug", 1, 100);
      const product = getProduct(slug);
      if (
        !product ||
        !Number.isInteger(item.quantity) ||
        Number(item.quantity) < 1 ||
        Number(item.quantity) > 20 ||
        !["signature", "grand"].includes(String(item.size))
      )
        throw new SubmissionError("Please check the bouquets in your bag.");
      return {
        slug,
        name: product.name,
        quantity: Number(item.quantity),
        size: item.size as "signature" | "grand",
        message: field(item, "message", 0, 300),
        unitPrice: product.price + (item.size === "grand" ? 30 : 0),
        sameDay: product.sameDay,
      };
    });
    const postalCode = field(data, "postalCode", 5, 5);
    if (!/^\d{5}$/.test(postalCode))
      throw new SubmissionError(
        "Please enter a five-digit French postal code.",
      );
    const subtotal = items.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0,
    );
    const delivery = subtotal >= 150 ? 0 : 12;
    const payload = {
      name: field(data, "name", 2, 100),
      email: emailField(data),
      phone: field(data, "phone", 6, 40),
      recipient: field(data, "recipient", 2, 100),
      address: field(data, "address", 5, 300),
      city: field(data, "city", 2, 100),
      postalCode,
      date: dateField(data, true, items.some((i) => !i.sameDay) ? 2 : 0),
      notes: field(data, "notes", 0, 1000),
      consent: consentField(data),
      items,
      subtotal,
      delivery,
      estimatedTotal: subtotal + delivery,
      currency: "USD",
      status: "pending-florist-confirmation",
    };
    const id = request.headers.get("idempotency-key") || undefined;
    const reference = await saveSubmission("orders", { payload }, id);
    return NextResponse.json(
      { reference, estimatedTotal: subtotal + delivery },
      { status: 201 },
    );
  } catch (error) {
    return submissionFailure(error);
  }
}
