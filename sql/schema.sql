-- Schema Lisle CMS (Neon)
-- Executeu això al SQL Editor de Neon una vegada.

CREATE TABLE IF NOT EXISTS cms_content (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO cms_content (id, payload)
VALUES (1, '{}'::jsonb)
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS family_blocks (
  id TEXT PRIMARY KEY,
  apartment_id TEXT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  note TEXT NOT NULL DEFAULT 'uso-familiar',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS family_blocks_apartment_idx
  ON family_blocks (apartment_id);
