import apartmentsData from "../data/apartments.json";
import siteData from "../data/site.json";
import { readCms } from "./store";

const deepMergeLang = (base, override, locale) => {
  if (override == null) return base;
  if (typeof override === "object" && !Array.isArray(override)) {
    if ("ca" in override || "es" in override || "fr" in override) {
      return override[locale] ?? override.ca ?? base;
    }
  }
  return override;
};

/** Aplica overlays del CMS al diccionari d'idioma. */
export const applyCmsToDict = (dict, cms, locale) => {
  if (!cms) return dict;
  const next = structuredClone(dict);

  if (cms.site?.tagline) {
    next.site.tagline = deepMergeLang(next.site.tagline, cms.site.tagline, locale);
  }
  if (cms.site?.distance) {
    next.site.distance = deepMergeLang(next.site.distance, cms.site.distance, locale);
  }

  if (cms.apartments) {
    Object.entries(cms.apartments).forEach(([id, apt]) => {
      if (!next.apartments[id]) next.apartments[id] = {};
      if (apt.name) {
        next.apartments[id].name = deepMergeLang(
          next.apartments[id].name,
          apt.name,
          locale
        );
      }
      if (apt.subtitle) {
        next.apartments[id].subtitle = deepMergeLang(
          next.apartments[id].subtitle,
          apt.subtitle,
          locale
        );
      }
      if (apt.description) {
        next.apartments[id].description = deepMergeLang(
          next.apartments[id].description,
          apt.description,
          locale
        );
      }
    });
  }

  if (cms.notes?.[locale]?.length) {
    next.notes.items = cms.notes[locale];
  } else if (cms.notes?.ca?.length && locale !== "ca") {
    // Si només hi ha notes en català editades, les mostrem com a fallback
    next.notes.items = cms.notes.ca;
  }

  return next;
};

export const getSiteWithCms = (cms = readCms()) => ({
  ...siteData,
  pricePerNight: cms.site?.pricePerNight ?? siteData.pricePerNight,
  whatsapp: cms.site?.whatsapp || siteData.whatsapp,
  phone: cms.site?.phone || siteData.phone,
});

export const getApartmentsWithCms = (cms = readCms()) =>
  apartmentsData.apartments.map((apt) => {
    const overlay = cms.apartments?.[apt.id] || {};
    const photos = overlay.photos?.length ? overlay.photos : apt.photos;
    return {
      ...apt,
      ...overlay,
      id: apt.id,
      features: overlay.features?.length ? overlay.features : apt.features,
      photos,
      image: overlay.image || photos?.[0]?.src || apt.image,
      price: overlay.price ?? apt.price,
      bookings: apt.bookings,
      availability: apt.availability,
      // multilingual fields live in dict; strip if present on overlay
      name: undefined,
      subtitle: undefined,
      description: undefined,
    };
  });
