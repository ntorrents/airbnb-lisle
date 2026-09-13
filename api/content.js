import { cors, ensureSchema, getSql, readBody, requireAdmin } from "./_lib/db.js";

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  try {
    await ensureSchema();
    const db = getSql();

    if (req.method === "GET") {
      const rows = await db`SELECT payload, updated_at FROM cms_content WHERE id = 1`;
      const row = rows[0];
      res.status(200).json({
        content: row?.payload || {},
        updatedAt: row?.updated_at || null,
      });
      return;
    }

    if (req.method === "PUT") {
      if (!requireAdmin(req, res)) return;
      const body = await readBody(req);
      const payload = body?.content;
      if (!payload || typeof payload !== "object") {
        res.status(400).json({ error: "Contingut invàlid" });
        return;
      }
      const rows = await db`
        INSERT INTO cms_content (id, payload, updated_at)
        VALUES (1, ${payload}, NOW())
        ON CONFLICT (id) DO UPDATE
        SET payload = EXCLUDED.payload, updated_at = NOW()
        RETURNING updated_at
      `;
      res.status(200).json({
        ok: true,
        updatedAt: rows[0]?.updated_at || null,
      });
      return;
    }

    res.status(405).json({ error: "Mètode no permès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Error del servidor" });
  }
}
