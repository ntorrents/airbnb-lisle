import { useEffect, useMemo, useState } from "react";
import {
  addBlock,
  loadBlocks,
  removeBlock,
  subscribeBlocks,
} from "../cms/store";
import { useCms } from "../cms/CmsContext";
import { localizeApartment } from "../i18n/utils";
import { useLanguage } from "../i18n/LanguageContext";
import "./FamilyDateManager.css";

const REASON_KEYS = ["uso-familiar", "mantenimiento", "bloqueo-manual"];

const FamilyDateManager = ({ onChange, alwaysOpen = false }) => {
  const { t, dict } = useLanguage();
  const { apartmentsBase } = useCms();
  const apartments = useMemo(
    () => apartmentsBase.map((apt) => localizeApartment(apt, dict)),
    [apartmentsBase, dict]
  );
  const [open, setOpen] = useState(alwaysOpen);
  const [blocks, setBlocks] = useState([]);
  const [form, setForm] = useState({
    apartmentId: "",
    checkIn: "",
    checkOut: "",
    reason: "uso-familiar",
  });
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!form.apartmentId && apartments[0]?.id) {
      setForm((prev) => ({ ...prev, apartmentId: apartments[0].id }));
    }
  }, [apartments, form.apartmentId]);

  useEffect(() => {
    const unsub = subscribeBlocks((list) => {
      setBlocks(
        list.map((block) => ({
          ...block,
          apartmentName:
            dict.apartments[block.apartmentId]?.name || block.apartmentId,
          reasonLabel: dict.family.reasons[block.note] || block.note,
        }))
      );
      onChange?.();
    });
    loadBlocks();
    return unsub;
  }, [dict, onChange]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!form.checkIn || !form.checkOut) {
      setMessage(t("family.needDates"));
      return;
    }

    setBusy(true);
    try {
      const result = await addBlock({
        apartmentId: form.apartmentId,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        note: form.reason,
      });

      if (!result.success) {
        setMessage(result.message || t("family.fail"));
        return;
      }

      setForm((prev) => ({ ...prev, checkIn: "", checkOut: "" }));
      setMessage(
        result.remote
          ? `${t("family.saved")} (núvol)`
          : t("family.saved")
      );
    } catch (error) {
      setMessage(error.message || t("family.fail"));
    } finally {
      setBusy(false);
    }
  };

  const handleRemove = async (blockId) => {
    setBusy(true);
    try {
      await removeBlock(blockId);
    } catch (error) {
      setMessage(error.message || t("family.fail"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="family">
      {!alwaysOpen && (
        <button
          type="button"
          className="family__toggle"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {open ? t("family.hide") : t("family.show")}
        </button>
      )}

      {open && (
        <div
          className={`family__panel ${alwaysOpen ? "family__panel--plain" : ""}`}
        >
          {!alwaysOpen && <p className="family__hint">{t("family.hint")}</p>}

          <form className="family__form" onSubmit={handleSubmit}>
            <label>
              {t("family.apartment")}
              <select
                value={form.apartmentId}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, apartmentId: e.target.value }))
                }
              >
                {apartments.map((apt) => (
                  <option key={apt.id} value={apt.id}>
                    {apt.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              {t("family.checkIn")}
              <input
                type="date"
                value={form.checkIn}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, checkIn: e.target.value }))
                }
              />
            </label>
            <label>
              {t("family.checkOut")}
              <input
                type="date"
                value={form.checkOut}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, checkOut: e.target.value }))
                }
              />
            </label>
            <label>
              {t("family.reason")}
              <select
                value={form.reason}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, reason: e.target.value }))
                }
              >
                {REASON_KEYS.map((key) => (
                  <option key={key} value={key}>
                    {t(`family.reasons.${key}`)}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className="btn btn-primary" disabled={busy}>
              {t("family.block")}
            </button>
          </form>

          {message && <p className="family__message">{message}</p>}

          {blocks.length > 0 && (
            <ul className="family__list">
              {blocks.map((block) => (
                <li key={block.id}>
                  <div>
                    <strong>{block.apartmentName}</strong>
                    <span>
                      {block.checkIn} → {block.checkOut} · {block.reasonLabel}
                    </span>
                  </div>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => handleRemove(block.id)}
                  >
                    {t("family.remove")}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default FamilyDateManager;
