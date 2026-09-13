const apiBase = () => import.meta.env.VITE_API_BASE || "";

const adminHeaders = (password, extra = {}) => ({
  "Content-Type": "application/json",
  "x-admin-password": password || "",
  ...extra,
});

export const fetchRemoteCms = async () => {
  const res = await fetch(`${apiBase()}/api/content`);
  if (!res.ok) throw new Error("No s'ha pogut carregar el contingut remot");
  return res.json();
};

export const saveRemoteCms = async (content, password) => {
  const res = await fetch(`${apiBase()}/api/content`, {
    method: "PUT",
    headers: adminHeaders(password),
    body: JSON.stringify({ content }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Error desant al núvol");
  return data;
};

export const fetchRemoteBlocks = async () => {
  const res = await fetch(`${apiBase()}/api/blocks`);
  if (!res.ok) throw new Error("No s'han pogut carregar les dates");
  const data = await res.json();
  return data.blocks || [];
};

export const createRemoteBlock = async (block, password) => {
  const res = await fetch(`${apiBase()}/api/blocks`, {
    method: "POST",
    headers: adminHeaders(password),
    body: JSON.stringify(block),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Error creant el bloqueig");
  return data.block;
};

export const deleteRemoteBlock = async (id, password) => {
  const res = await fetch(`${apiBase()}/api/blocks`, {
    method: "DELETE",
    headers: adminHeaders(password),
    body: JSON.stringify({ id }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Error eliminant el bloqueig");
  return data;
};

export const uploadRemotePhoto = async (file, password) => {
  const res = await fetch(`${apiBase()}/api/upload`, {
    method: "POST",
    headers: {
      "x-admin-password": password || "",
      "x-filename": file.name || "photo.jpg",
      "content-type": file.type || "application/octet-stream",
    },
    body: file,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Error pujant la foto");
  return data.url;
};

export const probeRemoteApi = async () => {
  try {
    const res = await fetch(`${apiBase()}/api/content`);
    return res.ok;
  } catch {
    return false;
  }
};
