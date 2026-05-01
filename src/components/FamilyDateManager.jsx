import { useMemo, useState } from "react";
import {
  getAllApartments,
  addManualBlock,
  removeManualBlock,
  getManualBlocks,
} from "../services/apartmentService";
import "./FamilyDateManager.css";

const FamilyDateManager = () => {
  const apartments = getAllApartments();
  const [apartmentId, setApartmentId] = useState(apartments[0]?.id || "");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [reason, setReason] = useState("uso-familiar");
  const [status, setStatus] = useState(null);
  const [refreshTick, setRefreshTick] = useState(0);

  const allBlocks = useMemo(
    () =>
      apartments.flatMap((apt) =>
        getManualBlocks(apt.id).map((block) => ({
          ...block,
          apartmentId: apt.id,
          apartmentName: apt.name,
        }))
      ),
    [apartments, refreshTick]
  );

  const handleAddBlock = () => {
    setStatus(null);
    const result = addManualBlock(apartmentId, {
      checkIn,
      checkOut,
      note: reason,
    });
    setStatus(result);
    if (result.success) {
      setCheckIn("");
      setCheckOut("");
      setReason("uso-familiar");
      setRefreshTick((v) => v + 1);
    }
  };

  const handleRemoveBlock = (selectedApartmentId, blockId) => {
    const result = removeManualBlock(selectedApartmentId, blockId);
    setStatus(result);
    if (result.success) {
      setRefreshTick((v) => v + 1);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  if (!apartments.length) {
    return null;
  }

  return (
    <section id="gestion-fechas" className="family-manager-section">
      <div className="container">
        <h2 className="section-title">Gestión rápida de fechas familiares</h2>
        <p className="section-subtitle">
          Para uso interno: marca los días que vais vosotros para que queden bloqueados
          en el calendario público automáticamente.
        </p>

        <div className="family-manager-grid">
          <article className="family-manager-card">
            <h3>Bloquear nuevas fechas</h3>
            <div className="manager-form">
              <label htmlFor="apartment-select">Apartamento</label>
              <select
                id="apartment-select"
                value={apartmentId}
                onChange={(e) => setApartmentId(e.target.value)}
              >
                {apartments.map((apt) => (
                  <option key={apt.id} value={apt.id}>
                    {apt.name}
                  </option>
                ))}
              </select>

              <div className="manager-dates">
                <div>
                  <label htmlFor="block-checkin">Entrada</label>
                  <input
                    id="block-checkin"
                    type="date"
                    value={checkIn}
                    min={today}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="block-checkout">Salida</label>
                  <input
                    id="block-checkout"
                    type="date"
                    value={checkOut}
                    min={checkIn || today}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
              </div>

              <label htmlFor="reason-select">Motivo</label>
              <select
                id="reason-select"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                <option value="uso-familiar">Uso familiar</option>
                <option value="mantenimiento">Mantenimiento</option>
                <option value="bloqueo-manual">Bloqueo manual</option>
              </select>

              <button type="button" className="btn btn-primary" onClick={handleAddBlock}>
                Guardar bloqueo
              </button>

              {status && (
                <p className={`manager-status ${status.success ? "ok" : "error"}`}>
                  {status.message}
                </p>
              )}
            </div>
          </article>

          <article className="family-manager-card">
            <h3>Bloqueos actuales</h3>
            {allBlocks.length === 0 ? (
              <p className="empty-blocks">No hay bloqueos familiares guardados todavía.</p>
            ) : (
              <ul className="blocks-list">
                {allBlocks.map((block) => (
                  <li key={block.id} className="block-item">
                    <div>
                      <strong>{block.apartmentName}</strong>
                      <p>
                        {block.checkIn} → {block.checkOut}
                      </p>
                      <small>{block.reason}</small>
                    </div>
                    <button
                      type="button"
                      className="btn-remove"
                      onClick={() => handleRemoveBlock(block.apartmentId, block.id)}
                    >
                      Quitar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </article>
        </div>
      </div>
    </section>
  );
};

export default FamilyDateManager;
