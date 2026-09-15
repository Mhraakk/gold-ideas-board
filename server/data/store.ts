import { seedConcepts } from "@/data/seed";
import { composeConcept } from "@/server/orchestrator/compose";
import type { Concept, Occasion, ProductKind } from "@/lib/types";

const OCC: Occasion[] = ["birthday", "celebration", "host", "ingot"];
const PROD: ProductKind[] = ["necklace", "plaque", "bracelet", "earrings", "set", "ingot"];

function fromGeneratedId(id: string): Concept | undefined {
  const parts = id.split("-");
  if (parts[0] !== "g" || parts.length < 4) return undefined;
  const occasion = parts[1] as Occasion;
  const productKind = parts[2] as ProductKind;
  if (!OCC.includes(occasion) || !PROD.includes(productKind)) return undefined;
  const salt = parts.slice(3, -1).join("-") || parts[3];
  const rebuilt = composeConcept({ occasion, productKind, note: "", salt });
  rebuilt.id = id;
  return rebuilt;
}

const extra: Concept[] = [];

export function listConcepts(): Concept[] {
  return [...seedConcepts, ...extra].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getConcept(id: string): Concept | undefined {
  return listConcepts().find((c) => c.id === id) ?? fromGeneratedId(id);
}

export function addConcept(concept: Concept): Concept {
  extra.unshift(concept);
  return concept;
}

export function pageConcepts(offset: number, limit: number): { items: Concept[]; total: number } {
  const all = listConcepts();
  return { items: all.slice(offset, offset + limit), total: all.length };
}
