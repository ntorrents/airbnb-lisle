import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useCms } from "../../cms/CmsContext";
import site from "../../data/site.json";
import "./Admin.css";

const AdminLogin = () => {
  const { authed, login } = useCms();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (authed) return <Navigate to="/admin" replace />;

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    if (login(password)) {
      navigate("/admin");
      return;
    }
    setError("Contrasenya incorrecta.");
  };

  return (
    <div className="admin-login">
      <form className="admin-login__card" onSubmit={handleSubmit}>
        <p className="admin-login__brand">{site.brand}</p>
        <h1>Àrea familiar</h1>
        <p className="admin-login__hint">
          Només per a la família. Aquí podeu editar fotos, textos, preus i dates.
        </p>
        <label>
          Contrasenya
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            autoFocus
          />
        </label>
        {error && <p className="admin-login__error">{error}</p>}
        <button type="submit" className="btn btn-primary">
          Entrar
        </button>
        <Link to="/" className="admin-login__back">
          ← Tornar a la web
        </Link>
      </form>
    </div>
  );
};

export default AdminLogin;
