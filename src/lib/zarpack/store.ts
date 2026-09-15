import { composeConcept } from "./compose";
import { getSeedById, SEED } from "./seed";
import type { Concept, GenerateInput } from "./types";

const memory = new Map<string, Concept>();

export function remember(concept: Concept): Concept {
  memory.set(concept.id, concept);
  return concept;
}

export function findConcept(id: string): Concept | undefined {
  const seeded = getSeedById(id);
  if (seeded) return seeded;
  return memory.get(id);
}

export function listBoard(): Concept[] {
  const extras = [...memory.values()].filter((c) => !c.seeded);
  return [...SEED, ...extras];
}

export function reconstructFromId(id: string): Concept | undefined {
  const existing = findConcept(id);
  if (existing) return existing;
  const match = /^zp-([a-z]+)-([a-z]+)-([0-9a-f]{8})$/.exec(id);
  if (!match) return undefined;
  const occasion = match[1];
  const productKind = match[2];
  const input: GenerateInput = {
    occasion: occasion as GenerateInput["occasion"],
    productKind: productKind as GenerateInput["productKind"],
    note: "بازسازی از شناسه.",
  };
  try {
    const concept = composeConcept(input, parseInt(match[3] ?? "0", 16));
    concept.id = id;
    concept.source = "compose";
    return remember(concept);
  } catch {
    return undefined;
  }
}
