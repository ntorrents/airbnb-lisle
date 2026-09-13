import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import FamilyDateManager from "../../components/FamilyDateManager";
import { useCms } from "../../cms/CmsContext";
import { localizeApartment } from "../../i18n/utils";
import ca from "../../i18n/locales/ca";
import es from "../../i18n/locales/es";
import fr from "../../i18n/locales/fr";
import siteDefaults from "../../data/site.json";
import "./Admin.css";

const LANGS = [
  { code: "ca", label: "Català" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
];

const catalogs = { ca, es, fr };

const getLangValue = (value, lang, fallback = "") => {
  if (value == null) return fallback;
  if (typeof value === "string") return value;
  return value[lang] ?? value.ca ?? fallback;
};

const setLangValue = (current, lang, nextValue) => {
  const base =
    current && typeof current === "object" && !Array.isArray(current)
      ? { ...current }
      : { ca: typeof current === "string" ? current : "", es: "", fr: "" };
  base[lang] = nextValue;
  return base;
};

const AdminDashboard = () => {
  const {
    cms,
    save,
    reset,
    logout,
    exportJson,
    importJson,
    apartmentsBase,
    site,
    remote,
    syncing,
    syncError,
    uploadPhoto,
    refreshRemote,
  } = useCms();
  const [tab, setTab] = useState("site");
  const [lang, setLang] = useState("ca");
  const [status, setStatus] = useState("");
  const [importText, setImportText] = useState("");
  const [uploading, setUploading] = useState("");

  const defaultsForLang = catalogs[lang];

  const draftApartments = useMemo(() => {
    return apartmentsBase.map((apt) => {
      const overlay = cms.apartments?.[apt.id] || {};
      const localized = localizeApartment(apt, defaultsForLang);
      return {
        id: apt.id,
        price: overlay.price ?? apt.price,
        bedrooms: overlay.bedrooms ?? apt.bedrooms,
        bathrooms: overlay.bathrooms ?? apt.bathrooms,
        size: overlay.size ?? apt.size,
        maxGuests: overlay.maxGuests ?? apt.maxGuests,
        image: overlay.image || apt.image,
        photos: overlay.photos?.length ? overlay.photos : apt.photos,
        name: getLangValue(overlay.name, lang, localized.name),
        subtitle: getLangValue(overlay.subtitle, lang, localized.subtitle),
        description: getLangValue(
          overlay.description,
          lang,
          localized.description
        ),
      };
    });
  }, [apartmentsBase, cms.apartments, defaultsForLang, lang]);

  const draftNotes =
    cms.notes?.[lang] ||
    defaultsForLang.notes.items.map((n) => ({ ...n }));

  const flash = (msg) => {
    setStatus(msg);
    window.setTimeout(() => setStatus(""), 2800);
  };

  const persist = async (next, okMsg = "Desat") => {
    const result = await save(next);
    if (result?.error) {
      flash(`Desat en local · Error núvol: ${result.error}`);
      return;
    }
    flash(result?.remote ? `${okMsg} (núvol)` : `${okMsg} (només aquest navegador)`);
  };

  const updateSiteField = (field, value) => {
    persist({
      ...cms,
      site: {
        ...cms.site,
        [field]: value,
      },
    });
  };

  const updateSiteLangField = (field, value) => {
    persist({
      ...cms,
      site: {
        ...cms.site,
        [field]: setLangValue(cms.site?.[field], lang, value),
      },
    });
  };

  const updateApartment = (id, patch) => {
    const current = cms.apartments?.[id] || {};
    persist({
      ...cms,
      apartments: {
        ...cms.apartments,
        [id]: { ...current, ...patch },
      },
    });
  };

  const updateApartmentLang = (id, field, value) => {
    const current = cms.apartments?.[id] || {};
    updateApartment(id, {
      [field]: setLangValue(current[field], lang, value),
    });
  };

  const updatePhotoSrc = (aptId, index, src) => {
    const apt = draftApartments.find((a) => a.id === aptId);
    const photos = apt.photos.map((p, i) => (i === index ? { ...p, src } : p));
    updateApartment(aptId, {
      photos,
      image: index === 0 ? src : apt.image,
    });
  };

  const handleUploadPhoto = async (aptId, index, file) => {
    if (!file) return;
    setUploading(`${aptId}-${index}`);
    try {
      const url = await uploadPhoto(file);
      updatePhotoSrc(aptId, index, url);
      flash("Foto pujada");
    } catch (error) {
      flash(error.message || "No s'ha pogut pujar la foto");
    } finally {
      setUploading("");
    }
  };

  const addPhoto = (aptId) => {
    const apt = draftApartments.find((a) => a.id === aptId);
    updateApartment(aptId, {
      photos: [...apt.photos, { src: "", key: `photo-${Date.now()}` }],
    });
  };

  const removePhoto = (aptId, index) => {
    const apt = draftApartments.find((a) => a.id === aptId);
    const photos = apt.photos.filter((_, i) => i !== index);
    updateApartment(aptId, {
      photos,
      image: photos[0]?.src || apt.image,
    });
  };

  const updateNote = (index, patch) => {
    const notes = draftNotes.map((n, i) => (i === index ? { ...n, ...patch } : n));
    persist({
      ...cms,
      notes: { ...cms.notes, [lang]: notes },
    });
  };

  const addNote = () => {
    const notes = [
      ...draftNotes,
      {
        id: `n-${Date.now()}`,
        place: "Nou lloc",
        note: "Escriviu la recomanació…",
        tag: "nota",
        rotation: 0,
        color: "sage",
      },
    ];
    persist(
      {
        ...cms,
        notes: { ...cms.notes, [lang]: notes },
      },
      "Nota afegida"
    );
  };

  const removeNote = (index) => {
    const notes = draftNotes.filter((_, i) => i !== index);
    persist(
      {
        ...cms,
        notes: { ...cms.notes, [lang]: notes },
      },
      "Nota eliminada"
    );
  };

  const handleImport = async () => {
    try {
      await importJson(importText);
      setImportText("");
      flash("Importat correctament");
    } catch {
      flash("Error en importar el JSON");
    }
  };

  const handleReset = async () => {
    if (
      window.confirm(
        "Segur que voleu esborrar tots els canvis del CMS?"
      )
    ) {
      await reset();
      flash("Contingut restablert");
    }
  };

  return (
    <div className="admin">
      <header className="admin__top">
        <div>
          <p className="admin__eyebrow">Família Lisle</p>
          <h1>Administració</h1>
        </div>
        <div className="admin__top-actions">
          <Link to="/" className="btn btn-ghost">
            Veure web
          </Link>
          <button type="button" className="btn btn-ghost" onClick={logout}>
            Sortir
          </button>
        </div>
      </header>

      <p className={`admin__notice ${remote ? "admin__notice--ok" : ""}`}>
        {syncing
          ? "Sincronitzant amb el núvol…"
          : remote
            ? "Connectat a Neon: els canvis es comparteixen entre dispositius."
            : "Mode local: no hi ha API/Neon disponible ara. Els canvis queden en aquest navegador fins que configureu el backend."}
        {syncError ? ` · ${syncError}` : ""}
      </p>

      <div className="admin__row" style={{ marginBottom: "1rem" }}>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={async () => {
            const result = await refreshRemote();
            flash(result.remote ? "Sincronitzat" : "Sense connexió remota");
          }}
        >
          Tornar a sincronitzar
        </button>
      </div>

      {status && <p className="admin__status">{status}</p>}

      <div className="admin__tabs">
        {[
          ["site", "General"],
          ["apts", "Apartaments"],
          ["notes", "Recomanacions"],
          ["dates", "Dates"],
          ["backup", "Còpia"],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={tab === id ? "is-active" : ""}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {(tab === "apts" || tab === "notes" || tab === "site") && (
        <div className="admin__langs">
          {LANGS.map((item) => (
            <button
              key={item.code}
              type="button"
              className={lang === item.code ? "is-active" : ""}
              onClick={() => setLang(item.code)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {tab === "site" && (
        <section className="admin__panel">
          <h2>Dades generals</h2>
          <div className="admin__grid">
            <label>
              Preu / nit (€)
              <input
                type="number"
                min="0"
                value={cms.site?.pricePerNight ?? site.pricePerNight}
                onChange={(e) =>
                  updateSiteField("pricePerNight", Number(e.target.value) || 0)
                }
              />
            </label>
            <label>
              WhatsApp (sense +)
              <input
                value={cms.site?.whatsapp ?? siteDefaults.whatsapp}
                onChange={(e) => updateSiteField("whatsapp", e.target.value)}
              />
            </label>
            <label>
              Telèfon
              <input
                value={cms.site?.phone ?? siteDefaults.phone}
                onChange={(e) => updateSiteField("phone", e.target.value)}
              />
            </label>
            <label className="admin__full">
              Eslogan ({lang})
              <input
                value={getLangValue(
                  cms.site?.tagline,
                  lang,
                  defaultsForLang.site.tagline
                )}
                onChange={(e) => updateSiteLangField("tagline", e.target.value)}
              />
            </label>
            <label className="admin__full">
              Distància ({lang})
              <input
                value={getLangValue(
                  cms.site?.distance,
                  lang,
                  defaultsForLang.site.distance
                )}
                onChange={(e) => updateSiteLangField("distance", e.target.value)}
              />
            </label>
          </div>
        </section>
      )}

      {tab === "apts" && (
        <div className="admin__stack">
          {draftApartments.map((apt) => (
            <section key={apt.id} className="admin__panel">
              <h2>
                {apt.name}{" "}
                <span className="admin__muted">({apt.id})</span>
              </h2>
              <div className="admin__grid">
                <label>
                  Nom ({lang})
                  <input
                    value={apt.name}
                    onChange={(e) =>
                      updateApartmentLang(apt.id, "name", e.target.value)
                    }
                  />
                </label>
                <label>
                  Subtítol ({lang})
                  <input
                    value={apt.subtitle}
                    onChange={(e) =>
                      updateApartmentLang(apt.id, "subtitle", e.target.value)
                    }
                  />
                </label>
                <label className="admin__full">
                  Descripció ({lang})
                  <textarea
                    rows={3}
                    value={apt.description}
                    onChange={(e) =>
                      updateApartmentLang(apt.id, "description", e.target.value)
                    }
                  />
                </label>
                <label>
                  Preu (€)
                  <input
                    type="number"
                    min="0"
                    value={apt.price}
                    onChange={(e) =>
                      updateApartment(apt.id, {
                        price: Number(e.target.value) || 0,
                      })
                    }
                  />
                </label>
                <label>
                  Dormitoris
                  <input
                    type="number"
                    min="0"
                    value={apt.bedrooms}
                    onChange={(e) =>
                      updateApartment(apt.id, {
                        bedrooms: Number(e.target.value) || 0,
                      })
                    }
                  />
                </label>
                <label>
                  Banys
                  <input
                    type="number"
                    min="0"
                    value={apt.bathrooms}
                    onChange={(e) =>
                      updateApartment(apt.id, {
                        bathrooms: Number(e.target.value) || 0,
                      })
                    }
                  />
                </label>
                <label>
                  m²
                  <input
                    type="number"
                    min="0"
                    value={apt.size}
                    onChange={(e) =>
                      updateApartment(apt.id, {
                        size: Number(e.target.value) || 0,
                      })
                    }
                  />
                </label>
                <label>
                  Màx. persones
                  <input
                    type="number"
                    min="1"
                    value={apt.maxGuests}
                    onChange={(e) =>
                      updateApartment(apt.id, {
                        maxGuests: Number(e.target.value) || 1,
                      })
                    }
                  />
                </label>
              </div>

              <h3>Fotos</h3>
              <p className="admin__help">
                Pugeu un fitxer (Vercel Blob) o enganxeu una URL. La primera foto
                és la de portada. Màx. 8MB.
              </p>
              <ul className="admin__photos">
                {apt.photos.map((photo, index) => (
                  <li key={`${apt.id}-photo-${index}`}>
                    {photo.src ? (
                      <img src={photo.src} alt="" />
                    ) : (
                      <div className="admin__photo-empty">Sense foto</div>
                    )}
                    <div className="admin__photo-fields">
                      <input
                        value={photo.src}
                        placeholder="https://…"
                        onChange={(e) =>
                          updatePhotoSrc(apt.id, index, e.target.value)
                        }
                      />
                      <label className="admin__file">
                        {uploading === `${apt.id}-${index}`
                          ? "Pujant…"
                          : "Pujar fitxer"}
                        <input
                          type="file"
                          accept="image/*"
                          disabled={!!uploading}
                          onChange={(e) =>
                            handleUploadPhoto(
                              apt.id,
                              index,
                              e.target.files?.[0]
                            )
                          }
                        />
                      </label>
                    </div>
                    <button
                      type="button"
                      className="admin__linkish"
                      onClick={() => removePhoto(apt.id, index)}
                    >
                      Treure
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => addPhoto(apt.id)}
              >
                Afegir foto
              </button>
            </section>
          ))}
        </div>
      )}

      {tab === "notes" && (
        <section className="admin__panel">
          <div className="admin__row">
            <h2>Recomanacions ({lang})</h2>
            <button type="button" className="btn btn-primary" onClick={addNote}>
              Afegir nota
            </button>
          </div>
          <div className="admin__stack">
            {draftNotes.map((note, index) => (
              <article key={note.id} className="admin__note">
                <label>
                  Etiqueta
                  <input
                    value={note.tag}
                    onChange={(e) => updateNote(index, { tag: e.target.value })}
                  />
                </label>
                <label>
                  Lloc
                  <input
                    value={note.place}
                    onChange={(e) =>
                      updateNote(index, { place: e.target.value })
                    }
                  />
                </label>
                <label className="admin__full">
                  Text
                  <textarea
                    rows={3}
                    value={note.note}
                    onChange={(e) =>
                      updateNote(index, { note: e.target.value })
                    }
                  />
                </label>
                <label>
                  Color
                  <select
                    value={note.color}
                    onChange={(e) =>
                      updateNote(index, { color: e.target.value })
                    }
                  >
                    <option value="sage">Verd</option>
                    <option value="sky">Blau</option>
                    <option value="sand">Sorra</option>
                    <option value="rose">Rosa</option>
                  </select>
                </label>
                <button
                  type="button"
                  className="admin__linkish"
                  onClick={() => removeNote(index)}
                >
                  Eliminar
                </button>
              </article>
            ))}
          </div>
        </section>
      )}

      {tab === "dates" && (
        <section className="admin__panel">
          <h2>Bloquejar / reservar dates</h2>
          <p className="admin__help">
            Marqueu quan la casa està ocupada per la família o en manteniment.
            Es veurà al calendari públic.
          </p>
          <FamilyDateManager alwaysOpen />
        </section>
      )}

      {tab === "backup" && (
        <section className="admin__panel">
          <h2>Exportar / importar</h2>
          <p className="admin__help">
            Descarregueu una còpia per passar-la a un altre dispositiu, o
            enganxeu un JSON exportat abans.
          </p>
          <div className="admin__row">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                const blob = new Blob([exportJson()], {
                  type: "application/json",
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `lisle-cms-${new Date().toISOString().slice(0, 10)}.json`;
                a.click();
                URL.revokeObjectURL(url);
                flash("Exportat");
              }}
            >
              Descarregar JSON
            </button>
            <button type="button" className="btn btn-ghost" onClick={handleReset}>
              Restablir tot
            </button>
          </div>
          <label className="admin__full">
            Importar JSON
            <textarea
              rows={8}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder='Enganxeu aquí el contingut del fitxer…'
            />
          </label>
          <button type="button" className="btn btn-primary" onClick={handleImport}>
            Importar
          </button>
          {cms.updatedAt && (
            <p className="admin__muted">
              Darrera actualització: {new Date(cms.updatedAt).toLocaleString()}
            </p>
          )}
        </section>
      )}
    </div>
  );
};

export default AdminDashboard;
