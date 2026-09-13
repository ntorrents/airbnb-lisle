import { useMemo, useState } from "react";
import { getCombinedBookings } from "../services/apartmentService";
import { useCms } from "../cms/CmsContext";
import { useLanguage } from "../i18n/LanguageContext";
import "./AvailabilityCalendar.css";

const AvailabilityCalendar = ({ apartment, onClose }) => {
  const { t, dict, localeTag } = useLanguage();
  const { site } = useCms();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  const monthNames = dict.months;
  const dayNames = dict.days;

  const occupiedDates = useMemo(() => {
    const allBookings = apartment ? getCombinedBookings(apartment.id) : [];
    const dates = [];

    allBookings.forEach((booking) => {
      const start = new Date(booking.checkIn);
      const end = new Date(booking.checkOut);
      if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return;

      const current = new Date(start);
      while (current < end) {
        dates.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
    });

    return dates;
  }, [apartment]);

  const getNextMonth = (date) => {
    const next = new Date(date);
    next.setMonth(date.getMonth() + 1);
    return next;
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    let startingDayOfWeek = firstDay.getDay();
    startingDayOfWeek = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const isDateOccupied = (date) =>
    !!date &&
    occupiedDates.some((d) => d.toDateString() === date.toDateString());

  const isDateSelected = (date) =>
    !!date &&
    ((checkIn && date.toDateString() === checkIn.toDateString()) ||
      (checkOut && date.toDateString() === checkOut.toDateString()));

  const isDateInRange = (date) =>
    !!date && !!checkIn && !!checkOut && date > checkIn && date < checkOut;

  const isDateInPast = (date) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDateClick = (date) => {
    if (!date || isDateOccupied(date) || isDateInPast(date)) return;

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
    } else if (date < checkIn) {
      setCheckIn(date);
    } else {
      setCheckOut(date);
    }
  };

  const navigateMonth = (direction) => {
    const next = new Date(currentDate);
    next.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(next);
  };

  const nights =
    checkIn && checkOut
      ? Math.ceil(Math.abs(checkOut - checkIn) / (1000 * 60 * 60 * 24))
      : 0;
  const total = nights * apartment.price;

  const formatDate = (date) =>
    date.toLocaleDateString(localeTag, {
      weekday: "short",
      day: "numeric",
      month: "short",
    });

  const nightsLabel =
    nights === 1
      ? t("calendar.nights", { n: nights })
      : t("calendar.nights_plural", { n: nights });

  const datesPart =
    checkIn && checkOut
      ? t("calendar.waDates", {
          from: checkIn.toLocaleDateString(localeTag),
          to: checkOut.toLocaleDateString(localeTag),
          nights: nightsLabel,
          total,
        })
      : "";

  const whatsappText = encodeURIComponent(
    t("calendar.waMessage", { name: apartment.name, dates: datesPart })
  );

  const canGoPrev =
    !(
      currentDate.getMonth() === new Date().getMonth() &&
      currentDate.getFullYear() === new Date().getFullYear()
    );

  const renderMonth = (date) => {
    const days = getDaysInMonth(date);
    return (
      <div className="cal-month" key={date.toISOString()}>
        <h3>
          {monthNames[date.getMonth()]} {date.getFullYear()}
        </h3>
        <div className="cal-grid">
          {dayNames.map((day, i) => (
            <div key={`${day}-${i}`} className="cal-dow">
              {day}
            </div>
          ))}
          {days.map((day, index) => {
            const occupied = isDateOccupied(day);
            const selected = isDateSelected(day);
            const inRange = isDateInRange(day);
            const past = isDateInPast(day);
            return (
              <button
                key={index}
                type="button"
                disabled={!day || occupied || past}
                className={[
                  "cal-day",
                  !day && "is-empty",
                  occupied && "is-occupied",
                  selected && "is-selected",
                  inRange && "is-range",
                  past && "is-past",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => handleDateClick(day)}
              >
                {day ? day.getDate() : ""}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="cal-overlay" onClick={onClose} role="presentation">
      <div
        className="cal-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={t("calendar.selectDates")}
      >
        <header className="cal-header">
          <div>
            <p className="cal-kicker">{apartment.name}</p>
            <h2>{t("calendar.title")}</h2>
          </div>
          <button
            type="button"
            className="cal-close"
            onClick={onClose}
            aria-label={t("calendar.close")}
          >
            ×
          </button>
        </header>

        <div className="cal-body">
          <div className="cal-left">
            <div className="cal-nav">
              <button
                type="button"
                onClick={() => navigateMonth(-1)}
                disabled={!canGoPrev}
                aria-label={t("calendar.prevMonth")}
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => navigateMonth(1)}
                aria-label={t("calendar.nextMonth")}
              >
                →
              </button>
            </div>
            <div className="cal-months">
              {renderMonth(currentDate)}
              {renderMonth(getNextMonth(currentDate))}
            </div>
            <div className="cal-legend">
              <span>
                <i className="dot available" /> {t("calendar.available")}
              </span>
              <span>
                <i className="dot occupied" /> {t("calendar.occupied")}
              </span>
              <span>
                <i className="dot selected" /> {t("calendar.selected")}
              </span>
            </div>
          </div>

          <aside className="cal-right">
            <p className="cal-price">
              <strong>{apartment.price}€</strong> {t("calendar.perNight")}
            </p>

            <div className="cal-dates">
              {checkIn && checkOut ? (
                <>
                  <div>
                    <span>{t("calendar.checkIn")}</span>
                    <strong>{formatDate(checkIn)}</strong>
                  </div>
                  <div>
                    <span>{t("calendar.checkOut")}</span>
                    <strong>{formatDate(checkOut)}</strong>
                  </div>
                  <p className="cal-nights">
                    {nightsLabel} · {total}€
                  </p>
                </>
              ) : (
                <p className="cal-hint">
                  {checkIn ? t("calendar.pickCheckout") : t("calendar.pickCheckin")}
                </p>
              )}
            </div>

            {(checkIn || checkOut) && (
              <button
                type="button"
                className="cal-clear"
                onClick={() => {
                  setCheckIn(null);
                  setCheckOut(null);
                }}
              >
                {t("calendar.clear")}
              </button>
            )}

            <a
              className="btn btn-whatsapp cal-wa"
              href={`https://wa.me/${site.whatsapp}?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("calendar.askWhatsapp")}
            </a>
            <p className="cal-note">{t("calendar.note")}</p>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
