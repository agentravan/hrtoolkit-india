import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("Phase 1 foundation", () => {
  it("enables RLS on every application table", () => {
    const sql = read("supabase/migrations/001_initial.sql");
    for (const table of ["templates","orders","consents","revisions","deliverables","email_logs","admin_actions","ai_runs"]) {
      expect(sql).toMatch(new RegExp(`alter table ${table} enable row level security`, "i"));
    }
  });

  it("adds single-use action tokens and one-active-builder protection", () => {
    const sql = read("supabase/migrations/002_phase1_hardening.sql");
    expect(sql).toMatch(/create table if not exists action_tokens/i);
    expect(sql).toMatch(/action_tokens.*used_at/is);
    expect(sql).toMatch(/ai_runs_one_active_builder_per_order/i);
  });

  it("adds 30-day retention timestamps and generation alert timing fields", () => {
    const sql = read("supabase/migrations/002_phase1_hardening.sql");
    expect(sql).toMatch(/sample_file_expires_at/i);
    expect(sql).toMatch(/payment_screenshot_expires_at/i);
    expect(sql).toMatch(/generation_deadline_at/i);
    expect(sql).toMatch(/generation_alerted_at/i);
  });

  it("keeps legacy Razorpay routes out of the repository", () => {
    for (const file of [
      "app/api/create-order/route.ts",
      "app/api/payment/verify/route.ts",
      "app/api/razorpay/webhook/route.ts",
    ]) {
      expect(fs.existsSync(path.join(root, file))).toBe(false);
    }
  });
});
