import {
  createRemoteBlock,
  deleteRemoteBlock,
  fetchRemoteBlocks,
  fetchRemoteCms,
  probeRemoteApi,
  saveRemoteCms,
  uploadRemotePhoto,
} from "./api";

const CMS_KEY = "lisle-cms-v1";
const AUTH_KEY = "lisle-admin-session";
const AUTH_PW_KEY = "lisle-admin-pw";
const BLOCKS_KEY = "family-apartment-blocks";

/** Contrasenya familiar (front). Al servidor useu ADMIN_PASSWORD. */
export const ADMIN_PASSWORD =
  import.meta.env.VITE_ADMIN_PASSWORD || "lisle-familia";

const listeners = new Set();
const blockListeners = new Set();

let remoteEnabled = null;

export const emptyCms = () => ({
  version: 1,
  updatedAt: null,
  site: {},
  apartments: {},
  notes: {},
});

export const readCms = () => {
  try {
    const raw = localStorage.getItem(CMS_KEY);
    if (!raw) return emptyCms();
    return { ...emptyCms(), ...JSON.parse(raw) };
  } catch {
    return emptyCms();
  }
};

const notify = (payload) => {
  listeners.forEach((fn) => fn(payload));
};

export const writeCmsLocal = (next) => {
  const payload = {
    ...emptyCms(),
    ...next,
    version: 1,
    updatedAt: next.updatedAt || new Date().toISOString(),
  };
  localStorage.setItem(CMS_KEY, JSON.stringify(payload));
  notify(payload);
  return payload;
};

export const writeCms = async (next, { sync = true } = {}) => {
  const payload = writeCmsLocal(next);
  if (!sync) return { content: payload, remote: false };

  const password = getAdminPassword();
  if (!password) return { content: payload, remote: false };

  try {
    const available = remoteEnabled ?? (await probeRemoteApi());
    remoteEnabled = available;
    if (!available) return { content: payload, remote: false };
    const result = await saveRemoteCms(payload, password);
    const withTime = writeCmsLocal({
      ...payload,
      updatedAt: result.updatedAt || payload.updatedAt,
    });
    return { content: withTime, remote: true };
  } catch (error) {
    return { content: payload, remote: false, error: error.message };
  }
};

export const subscribeCms = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

export const resetCms = async () => {
  localStorage.removeItem(CMS_KEY);
  const empty = emptyCms();
  notify(empty);
  const password = getAdminPassword();
  if (password && (remoteEnabled ?? (await probeRemoteApi()))) {
    try {
      await saveRemoteCms(empty, password);
    } catch {
      /* ignore */
    }
  }
  return empty;
};

export const hydrateCmsFromRemote = async () => {
  try {
    const available = await probeRemoteApi();
    remoteEnabled = available;
    if (!available) return { content: readCms(), remote: false };
    const data = await fetchRemoteCms();
    const content = {
      ...emptyCms(),
      ...(data.content || {}),
      updatedAt: data.updatedAt || null,
    };
    writeCmsLocal(content);
    return { content, remote: true };
  } catch {
    remoteEnabled = false;
    return { content: readCms(), remote: false };
  }
};

export const isRemoteEnabled = () => remoteEnabled;

export const isAdminLoggedIn = () => {
  try {
    return sessionStorage.getItem(AUTH_KEY) === "1";
  } catch {
    return false;
  }
};

export const getAdminPassword = () => {
  try {
    return sessionStorage.getItem(AUTH_PW_KEY) || "";
  } catch {
    return "";
  }
};

export const loginAdmin = (password) => {
  if (password !== ADMIN_PASSWORD) return false;
  sessionStorage.setItem(AUTH_KEY, "1");
  sessionStorage.setItem(AUTH_PW_KEY, password);
  return true;
};

export const logoutAdmin = () => {
  sessionStorage.removeItem(AUTH_KEY);
  sessionStorage.removeItem(AUTH_PW_KEY);
};

export const exportCmsJson = () => JSON.stringify(readCms(), null, 2);

export const importCmsJson = async (jsonText) => {
  const parsed = JSON.parse(jsonText);
  if (!parsed || typeof parsed !== "object") {
    throw new Error("JSON no vàlid");
  }
  return writeCms(parsed);
};

/** ----- Family blocks ----- */

const parseLocalBlocksMap = () => {
  try {
    const raw = localStorage.getItem(BLOCKS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const writeLocalBlocksMap = (map) => {
  localStorage.setItem(BLOCKS_KEY, JSON.stringify(map));
};

const flattenBlocks = (map) =>
  Object.entries(map).flatMap(([apartmentId, list]) =>
    (list || []).map((block) => ({
      ...block,
      apartmentId,
    }))
  );

export const getLocalBlocksFlat = () => flattenBlocks(parseLocalBlocksMap());

export const subscribeBlocks = (fn) => {
  blockListeners.add(fn);
  return () => blockListeners.delete(fn);
};

const notifyBlocks = (blocks) => {
  blockListeners.forEach((fn) => fn(blocks));
};

export const loadBlocks = async () => {
  try {
    const available = remoteEnabled ?? (await probeRemoteApi());
    remoteEnabled = available;
    if (available) {
      const blocks = await fetchRemoteBlocks();
      // mirror to local cache as map
      const map = {};
      blocks.forEach((block) => {
        map[block.apartmentId] = map[block.apartmentId] || [];
        map[block.apartmentId].push({
          id: block.id,
          checkIn: block.checkIn,
          checkOut: block.checkOut,
          note: block.note,
          type: "manual-block",
          createdAt: block.createdAt,
        });
      });
      writeLocalBlocksMap(map);
      notifyBlocks(blocks);
      return { blocks, remote: true };
    }
  } catch {
    remoteEnabled = false;
  }
  const blocks = getLocalBlocksFlat().map((b) => ({
    id: b.id,
    apartmentId: b.apartmentId,
    checkIn: b.checkIn,
    checkOut: b.checkOut,
    note: b.note,
    createdAt: b.createdAt,
  }));
  notifyBlocks(blocks);
  return { blocks, remote: false };
};

export const addBlock = async ({ apartmentId, checkIn, checkOut, note }) => {
  const password = getAdminPassword();
  const available = remoteEnabled ?? (await probeRemoteApi());
  remoteEnabled = available;

  if (available && password) {
    const block = await createRemoteBlock(
      { apartmentId, checkIn, checkOut, note },
      password
    );
    await loadBlocks();
    return { success: true, block, remote: true };
  }

  // local fallback
  const map = parseLocalBlocksMap();
  const list = map[apartmentId] || [];
  const overlaps = list.some(
    (b) => checkIn < b.checkOut && checkOut > b.checkIn
  );
  if (overlaps) {
    return { success: false, message: "Aquest rang ja està ocupat" };
  }
  const block = {
    id: `manual-${Date.now()}`,
    checkIn,
    checkOut,
    note: note || "uso-familiar",
    type: "manual-block",
    createdAt: new Date().toISOString(),
  };
  map[apartmentId] = [...list, block];
  writeLocalBlocksMap(map);
  await loadBlocks();
  return { success: true, block: { ...block, apartmentId }, remote: false };
};

export const removeBlock = async (blockId) => {
  const password = getAdminPassword();
  const available = remoteEnabled ?? (await probeRemoteApi());
  remoteEnabled = available;

  if (available && password) {
    await deleteRemoteBlock(blockId, password);
    await loadBlocks();
    return { success: true, remote: true };
  }

  const map = parseLocalBlocksMap();
  Object.keys(map).forEach((apartmentId) => {
    map[apartmentId] = (map[apartmentId] || []).filter((b) => b.id !== blockId);
  });
  writeLocalBlocksMap(map);
  await loadBlocks();
  return { success: true, remote: false };
};

export const uploadPhoto = async (file) => {
  const password = getAdminPassword();
  if (!password) throw new Error("Cal iniciar sessió");
  return uploadRemotePhoto(file, password);
};
