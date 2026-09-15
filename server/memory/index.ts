export type SessionMemory = {
  lastOccasion?: string;
  lastProduct?: string;
  generatedIds: string[];
};

const sessions = new Map<string, SessionMemory>();

export function remember(id: string, patch: Partial<SessionMemory>): SessionMemory {
  const prev = sessions.get(id) ?? { generatedIds: [] };
  const next: SessionMemory = {
    lastOccasion: patch.lastOccasion ?? prev.lastOccasion,
    lastProduct: patch.lastProduct ?? prev.lastProduct,
    generatedIds: [...prev.generatedIds, ...(patch.generatedIds ?? [])].slice(-40),
  };
  sessions.set(id, next);
  return next;
}
