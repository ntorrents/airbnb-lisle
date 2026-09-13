#!/usr/bin/env node
/**
 * Crea taules a Neon i hi carrega el contingut inicial editable.
 * Ús: node --env-file=.env scripts/seed-neon.mjs
 */
import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const loadJson = (rel) =>
  JSON.parse(readFileSync(join(root, rel), "utf8"));

const loadLocaleDefault = async (code) => {
  const mod = await import(join(root, `src/i18n/locales/${code}.js`));
  return mod.default;
};

const main = async () => {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("Falta DATABASE_URL al .env");
    process.exit(1);
  }

  const sql = neon(databaseUrl);
  const apartmentsData = loadJson("src/data/apartments.json");
  const siteData = loadJson("src/data/site.json");
  const ca = await loadLocaleDefault("ca");
  const es = await loadLocaleDefault("es");
  const fr = await loadLocaleDefault("fr");

  console.log("→ Creant taules…");
  await sql`
    CREATE TABLE IF NOT EXISTS cms_content (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      payload JSONB NOT NULL DEFAULT '{}'::jsonb,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS family_blocks (
      id TEXT PRIMARY KEY,
      apartment_id TEXT NOT NULL,
      check_in DATE NOT NULL,
      check_out DATE NOT NULL,
      note TEXT NOT NULL DEFAULT 'uso-familiar',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS family_blocks_apartment_idx
    ON family_blocks (apartment_id)
  `;

  const apartments = {};
  for (const apt of apartmentsData.apartments) {
    apartments[apt.id] = {
      price: apt.price,
      bedrooms: apt.bedrooms,
      bathrooms: apt.bathrooms,
      size: apt.size,
      maxGuests: apt.maxGuests,
      image: apt.image,
      features: apt.features,
      photos: apt.photos,
      name: {
        ca: ca.apartments[apt.id]?.name || apt.id,
        es: es.apartments[apt.id]?.name || apt.id,
        fr: fr.apartments[apt.id]?.name || apt.id,
      },
      subtitle: {
        ca: ca.apartments[apt.id]?.subtitle || "",
        es: es.apartments[apt.id]?.subtitle || "",
        fr: fr.apartments[apt.id]?.subtitle || "",
      },
      description: {
        ca: ca.apartments[apt.id]?.description || "",
        es: es.apartments[apt.id]?.description || "",
        fr: fr.apartments[apt.id]?.description || "",
      },
    };
  }

  const payload = {
    version: 1,
    updatedAt: new Date().toISOString(),
    site: {
      pricePerNight: siteData.pricePerNight,
      whatsapp: siteData.whatsapp,
      phone: siteData.phone,
      tagline: {
        ca: ca.site.tagline,
        es: es.site.tagline,
        fr: fr.site.tagline,
      },
      distance: {
        ca: ca.site.distance,
        es: es.site.distance,
        fr: fr.site.distance,
      },
    },
    apartments,
    notes: {
      ca: ca.notes.items,
      es: es.notes.items,
      fr: fr.notes.items,
    },
  };

  console.log("→ Carregant contingut inicial CMS…");
  await sql`
    INSERT INTO cms_content (id, payload, updated_at)
    VALUES (1, ${payload}, NOW())
    ON CONFLICT (id) DO UPDATE
    SET payload = EXCLUDED.payload, updated_at = NOW()
  `;

  const rows = await sql`SELECT updated_at FROM cms_content WHERE id = 1`;
  const blockCount = await sql`SELECT COUNT(*)::int AS n FROM family_blocks`;

  console.log("✓ Taules a punt");
  console.log(`✓ CMS seed OK (${rows[0]?.updated_at})`);
  console.log(`✓ Bloquejos de dates: ${blockCount[0]?.n ?? 0}`);
  console.log("");
  console.log("Variables detectades:");
  console.log(`  DATABASE_URL: ${databaseUrl ? "OK" : "FALTA"}`);
  console.log(
    `  BLOB_READ_WRITE_TOKEN: ${process.env.BLOB_READ_WRITE_TOKEN ? "OK" : "FALTA"}`
  );
  console.log(
    `  ADMIN_PASSWORD: ${process.env.ADMIN_PASSWORD ? "OK" : "FALTA"}`
  );
  console.log(
    `  VITE_ADMIN_PASSWORD: ${process.env.VITE_ADMIN_PASSWORD ? "OK" : "FALTA"}`
  );
};

main().catch((error) => {
  console.error("Error seed:", error);
  process.exit(1);
});
