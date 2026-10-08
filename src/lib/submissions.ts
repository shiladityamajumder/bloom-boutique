import "server-only";
import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export class SubmissionError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}
const limits = new Map<string, { count: number; expires: number }>();
export async function readSubmission(
  request: Request,
): Promise<Record<string, unknown>> {
  const origin = request.headers.get("origin");
  if (
    origin &&
    new URL(request.url).origin !== origin &&
    process.env.SITE_ORIGIN !== origin
  )
    throw new SubmissionError("Please submit this form from our website.", 403);
  if (!(request.headers.get("content-type") || "").includes("application/json"))
    throw new SubmissionError("A JSON request is required.", 415);
  const address =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const key = createHash("sha256").update(address).digest("hex");
  const now = Date.now();
  for (const [id, value] of limits) if (value.expires < now) limits.delete(id);
  const entry = limits.get(key) || { count: 0, expires: now + 60000 };
  entry.count++;
  limits.set(key, entry);
  if (entry.count > 12)
    throw new SubmissionError(
      "A few too many requests. Please wait a minute and try again.",
      429,
    );
  const reader = request.body?.getReader();
  if (!reader) throw new SubmissionError("Please complete the form.");
  const chunks: Uint8Array[] = [];
  let length = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > 16384) {
      await reader.cancel();
      throw new SubmissionError("Your message is too long.", 413);
    }
    chunks.push(value);
  }
  let data: unknown;
  try {
    data = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw new SubmissionError("Please complete the form and try again.");
  }
  if (!data || typeof data !== "object" || Array.isArray(data))
    throw new SubmissionError("Invalid form data.");
  return data as Record<string, unknown>;
}
export function field(
  data: Record<string, unknown>,
  key: string,
  min = 0,
  max = 500,
) {
  const raw = data[key];
  if (raw !== undefined && typeof raw !== "string")
    throw new SubmissionError(`Please check your ${key}.`);
  const value = typeof raw === "string" ? raw.trim() : "";
  if (value.length < min || value.length > max)
    throw new SubmissionError(
      `Please check your ${key.replace(/([A-Z])/g, " $1").toLowerCase()}.`,
    );
  return value;
}
export function emailField(data: Record<string, unknown>) {
  const email = field(data, "email", 3, 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    throw new SubmissionError("Please enter a valid email address.");
  return email;
}
export function consentField(data: Record<string, unknown>) {
  if (data.consent !== true && data.consent !== "on")
    throw new SubmissionError("Please confirm your consent before sending.");
  return true;
}
export function parisDate(offset = 0) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + offset);
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}
export function dateField(
  data: Record<string, unknown>,
  required = false,
  offset = 0,
) {
  const value = field(data, "date", required ? 10 : 0, 10);
  if (!value) return "";
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(value) ||
    Number.isNaN(Date.parse(`${value}T12:00:00Z`)) ||
    new Date(`${value}T12:00:00Z`).toISOString().slice(0, 10) !== value ||
    value < parisDate(offset)
  )
    throw new SubmissionError(
      offset
        ? "Please choose a delivery date at least two days ahead for your made-to-order blooms."
        : "Please choose a valid date, today or later.",
    );
  return value;
}
export async function saveSubmission(
  kind: "inquiries" | "newsletter" | "orders",
  payload: Record<string, unknown>,
  id?: string,
) {
  const identifier = id || randomUUID();
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      identifier,
    )
  )
    throw new SubmissionError(
      "Invalid request reference. Please refresh and try again.",
    );
  const reference = `LDF-${kind === "orders" ? "ORD" : kind === "newsletter" ? "SUB" : "INQ"}-${identifier.slice(0, 8).toUpperCase()}`;
  const record = {
    reference,
    id: identifier,
    type: kind,
    createdAt: new Date().toISOString(),
    ...payload,
  };
  if (process.env.SUBMISSIONS_WEBHOOK_URL) {
    const endpoint = new URL(process.env.SUBMISSIONS_WEBHOOK_URL);
    if (endpoint.protocol !== "https:")
      throw new Error("Submission webhook must use HTTPS");
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": identifier,
        ...(process.env.SUBMISSIONS_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.SUBMISSIONS_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify(record),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error("Submission integration unavailable");
  } else {
    const directory = path.resolve(
      process.env.SUBMISSIONS_DIR || path.join(process.cwd(), ".data"),
      kind,
    );
    await mkdir(directory, { recursive: true });
    const file = path.join(directory, `${identifier}.json`);
    try {
      await writeFile(file, JSON.stringify(record, null, 2), {
        flag: "wx",
        mode: 0o600,
      });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
      const existing = JSON.parse(await readFile(file, "utf8"));
      if (JSON.stringify(existing.payload) !== JSON.stringify(payload.payload))
        throw new SubmissionError(
          "This request reference has already been used. Please refresh and try again.",
          409,
        );
    }
  }
  return reference;
}
export function submissionFailure(error: unknown) {
  if (error instanceof SubmissionError)
    return NextResponse.json(
      { error: error.message },
      { status: error.status },
    );
  console.error(
    "Submission could not be persisted:",
    error instanceof Error ? error.message : "Unknown error",
  );
  return NextResponse.json(
    {
      error:
        "Your request could not be saved right now. Please try again or contact the boutique directly.",
    },
    { status: 503 },
  );
}
