import { neon } from "@neondatabase/serverless";

let sql;

export const getSql = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("Falta DATABASE_URL (Neon)");
  }
  if (!sql) {
    sql = neon(process.env.DATABASE_URL);
  }
  return sql;
};

export const ensureSchema = async () => {
  const db = getSql();
  await db`
    CREATE TABLE IF NOT EXISTS cms_content (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      payload JSONB NOT NULL DEFAULT '{}'::jsonb,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await db`
    INSERT INTO cms_content (id, payload)
    VALUES (1, '{}'::jsonb)
    ON CONFLICT (id) DO NOTHING
  `;
  await db`
    CREATE TABLE IF NOT EXISTS family_blocks (
      id TEXT PRIMARY KEY,
      apartment_id TEXT NOT NULL,
      check_in DATE NOT NULL,
      check_out DATE NOT NULL,
      note TEXT NOT NULL DEFAULT 'uso-familiar',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await db`
    CREATE INDEX IF NOT EXISTS family_blocks_apartment_idx
    ON family_blocks (apartment_id)
  `;
};

export const cors = (res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, x-admin-password"
  );
};

export const readBody = async (req) => {
  if (req.body && typeof req.body === "object") return req.body;
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw) return {};
  return JSON.parse(raw);
};

export const requireAdmin = (req, res) => {
  const expected =
    process.env.ADMIN_PASSWORD ||
    process.env.VITE_ADMIN_PASSWORD ||
    "lisle-familia";
  const provided = req.headers["x-admin-password"];
  if (!provided || provided !== expected) {
    res.status(401).json({ error: "No autoritzat" });
    return false;
  }
  return true;
};
