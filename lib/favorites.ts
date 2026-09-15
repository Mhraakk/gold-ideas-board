const KEY = "zarpack-favs";

export function readFavs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function toggleFav(id: string): string[] {
  const cur = readFavs();
  const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
  window.localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}
