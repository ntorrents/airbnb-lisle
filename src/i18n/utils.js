export const getByPath = (obj, path) =>
  path.split(".").reduce((acc, key) => (acc == null ? acc : acc[key]), obj);

export const interpolate = (value, vars = {}) => {
  if (typeof value !== "string") return value;
  return value.replace(/\{(\w+)\}/g, (_, key) =>
    vars[key] != null ? String(vars[key]) : `{${key}}`
  );
};

export const localizeApartment = (apartment, dict) => {
  if (!apartment) return null;
  const copy = dict.apartments[apartment.id] || {};
  return {
    ...apartment,
    name: copy.name || apartment.id,
    subtitle: copy.subtitle || "",
    description: copy.description || "",
    featureLabels: (apartment.features || []).map(
      (key) => dict.features[key] || key
    ),
    photos: (apartment.photos || []).map((photo) => ({
      ...photo,
      alt: dict.photoAlts[photo.key] || photo.key,
    })),
  };
};
