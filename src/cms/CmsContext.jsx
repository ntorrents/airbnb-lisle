import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  exportCmsJson,
  hydrateCmsFromRemote,
  importCmsJson,
  isAdminLoggedIn,
  isRemoteEnabled,
  loadBlocks,
  loginAdmin,
  logoutAdmin,
  readCms,
  resetCms,
  subscribeCms,
  uploadPhoto,
  writeCms,
} from "./store";
import { getApartmentsWithCms, getSiteWithCms } from "./content";

const CmsContext = createContext(null);

export const CmsProvider = ({ children }) => {
  const [cms, setCms] = useState(() => readCms());
  const [authed, setAuthed] = useState(() => isAdminLoggedIn());
  const [remote, setRemote] = useState(false);
  const [syncing, setSyncing] = useState(true);
  const [syncError, setSyncError] = useState("");

  useEffect(() => {
    const unsub = subscribeCms(setCms);
    (async () => {
      setSyncing(true);
      setSyncError("");
      try {
        const result = await hydrateCmsFromRemote();
        setCms(result.content);
        setRemote(result.remote);
        await loadBlocks();
      } catch (error) {
        setSyncError(error.message || "Error de sincronització");
        setRemote(false);
      } finally {
        setSyncing(false);
      }
    })();
    return unsub;
  }, []);

  const value = useMemo(
    () => ({
      cms,
      authed,
      remote,
      syncing,
      syncError,
      site: getSiteWithCms(cms),
      apartmentsBase: getApartmentsWithCms(cms),
      save: async (next) => {
        const result = await writeCms(next);
        setRemote(result.remote || isRemoteEnabled());
        if (result.error) setSyncError(result.error);
        else setSyncError("");
        return result;
      },
      patch: async (partial) => writeCms({ ...readCms(), ...partial }),
      reset: async () => {
        const empty = await resetCms();
        setCms(empty);
      },
      login: (password) => {
        const ok = loginAdmin(password);
        setAuthed(ok);
        return ok;
      },
      logout: () => {
        logoutAdmin();
        setAuthed(false);
      },
      exportJson: exportCmsJson,
      importJson: async (text) => {
        const result = await importCmsJson(text);
        setCms(result.content);
        setRemote(result.remote || false);
        return result;
      },
      uploadPhoto,
      refreshRemote: async () => {
        setSyncing(true);
        const result = await hydrateCmsFromRemote();
        setCms(result.content);
        setRemote(result.remote);
        await loadBlocks();
        setSyncing(false);
        return result;
      },
    }),
    [cms, authed, remote, syncing, syncError]
  );

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCms = () => {
  const ctx = useContext(CmsContext);
  if (!ctx) throw new Error("useCms must be used within CmsProvider");
  return ctx;
};
