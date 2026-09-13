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
      const rows = await db`
        SELECT id, apartment_id, check_in, check_out, note, created_at
        FROM family_blocks
        ORDER BY check_in ASC
      `;
      res.status(200).json({
        blocks: rows.map((row) => ({
          id: row.id,
          apartmentId: row.apartment_id,
          checkIn: String(row.check_in).slice(0, 10),
          checkOut: String(row.check_out).slice(0, 10),
          note: row.note,
          createdAt: row.created_at,
        })),
      });
      return;
    }

    if (req.method === "POST") {
      if (!requireAdmin(req, res)) return;
      const body = await readBody(req);
      const { apartmentId, checkIn, checkOut, note } = body || {};
      if (!apartmentId || !checkIn || !checkOut) {
        res.status(400).json({ error: "Falten dades" });
        return;
      }

      const overlaps = await db`
        SELECT id FROM family_blocks
        WHERE apartment_id = ${apartmentId}
          AND check_in::date < ${checkOut}::date
          AND check_out::date > ${checkIn}::date
        LIMIT 1
      `;
      if (overlaps.length) {
        res.status(409).json({ error: "Aquest rang ja està ocupat" });
        return;
      }

      const id = `manual-${Date.now()}`;
      const rows = await db`
        INSERT INTO family_blocks (id, apartment_id, check_in, check_out, note)
        VALUES (${id}, ${apartmentId}, ${checkIn}, ${checkOut}, ${note || "uso-familiar"})
        RETURNING id, apartment_id, check_in, check_out, note, created_at
      `;
      const row = rows[0];
      res.status(201).json({
        block: {
          id: row.id,
          apartmentId: row.apartment_id,
          checkIn: String(row.check_in).slice(0, 10),
          checkOut: String(row.check_out).slice(0, 10),
          note: row.note,
          createdAt: row.created_at,
        },
      });
      return;
    }

    if (req.method === "DELETE") {
      if (!requireAdmin(req, res)) return;
      const body = await readBody(req);
      const id = body?.id || req.query?.id;
      if (!id) {
        res.status(400).json({ error: "Falta id" });
        return;
      }
      await db`DELETE FROM family_blocks WHERE id = ${id}`;
      res.status(200).json({ ok: true });
      return;
    }

    res.status(405).json({ error: "Mètode no permès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Error del servidor" });
  }
}
