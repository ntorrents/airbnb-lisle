import { useLanguage } from "../i18n/LanguageContext";
import "./NotesWall.css";

const NotesWall = () => {
  const { t, dict } = useLanguage();
  const notes = dict.notes.items;

  return (
    <div className="notes">
      <div className="notes__header container">
        <p className="section-kicker">{t("notes.kicker")}</p>
        <h2 className="section-title">{t("notes.title")}</h2>
        <p className="section-intro">{t("notes.intro")}</p>
      </div>

      <div className="notes__wall container">
        {notes.map((note) => (
          <article
            key={note.id}
            className={`note note--${note.color}`}
            style={{ "--rot": `${note.rotation}deg` }}
          >
            <span className="note__pin" aria-hidden="true" />
            <p className="note__tag">{note.tag}</p>
            <h3 className="note__place">{note.place}</h3>
            <p className="note__text">{note.note}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default NotesWall;
