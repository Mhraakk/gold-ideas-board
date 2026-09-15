import { FAV_KEY, LOCAL_CONCEPTS_KEY, type Concept } from "./types";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function readFavs(): string[] {
  const v = readJson<unknown>(FAV_KEY, []);
  return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
}

export function writeFavs(ids: string[]) {
  window.localStorage.setItem(FAV_KEY, JSON.stringify(ids));
}

export function toggleFav(id: string): string[] {
  const cur = readFavs();
  const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
  writeFavs(next);
  return next;
}

export function cacheConcept(concept: Concept) {
  const all = readJson<Record<string, Concept>>(LOCAL_CONCEPTS_KEY, {});
  all[concept.id] = concept;
  window.localStorage.setItem(LOCAL_CONCEPTS_KEY, JSON.stringify(all));
}

export function readCachedConcept(id: string): Concept | undefined {
  const all = readJson<Record<string, Concept>>(LOCAL_CONCEPTS_KEY, {});
  return all[id];
}

export function cacheMany(concepts: Concept[]) {
  const all = readJson<Record<string, Concept>>(LOCAL_CONCEPTS_KEY, {});
  for (const c of concepts) all[c.id] = c;
  window.localStorage.setItem(LOCAL_CONCEPTS_KEY, JSON.stringify(all));
}
