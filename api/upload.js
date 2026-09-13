import { put } from "@vercel/blob";
import { cors, requireAdmin } from "./_lib/db.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

const readRaw = async (req) => {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks);
};

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Mètode no permès" });
    return;
  }

  if (!requireAdmin(req, res)) return;

  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      res.status(503).json({
        error:
          "Falta BLOB_READ_WRITE_TOKEN. Creeu un Blob Store a Vercel o continueu amb URLs manuals.",
      });
      return;
    }

    const filename =
      req.headers["x-filename"] || `lisle-${Date.now()}.jpg`;
    const contentType = req.headers["content-type"] || "application/octet-stream";
    const buffer = await readRaw(req);

    if (!buffer.length) {
      res.status(400).json({ error: "Fitxer buit" });
      return;
    }

    if (buffer.length > 8 * 1024 * 1024) {
      res.status(400).json({ error: "Màxim 8MB per foto" });
      return;
    }

    const blob = await put(`lisle/${Date.now()}-${filename}`, buffer, {
      access: "public",
      contentType,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    res.status(200).json({ url: blob.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Error pujant la foto" });
  }
}
