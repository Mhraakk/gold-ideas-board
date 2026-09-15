import { createServerFn } from "@tanstack/react-start";
import { composeConcept, composeWave } from "./compose";
import { fetchGold } from "./gold";
import { guardGenerate } from "./guardrails";
import { findConcept, listBoard, remember, reconstructFromId } from "./store";
import type { Concept, GoldQuote } from "./types";

export const getBoard = createServerFn({ method: "GET" }).handler(
  async (): Promise<Concept[]> => listBoard(),
);

export const getConcept = createServerFn({ method: "GET" })
  .validator((input: unknown) => {
    if (typeof input !== "object" || input === null || !("id" in input)) {
      throw new Error("شناسه لازم است.");
    }
    const id = String((input as { id: unknown }).id);
    return { id };
  })
  .handler(async ({ data }): Promise<Concept> => {
    const found = findConcept(data.id) ?? reconstructFromId(data.id);
    if (!found) throw new Error("پرونده پیدا نشد.");
    return found;
  });

export const generateConceptFn = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const guarded = guardGenerate((input ?? {}) as Record<string, unknown>);
    if (!guarded.ok) throw new Error(guarded.reason);
    return guarded.value;
  })
  .handler(async ({ data }): Promise<Concept> => {
    const composed = composeConcept(data, Date.now());
    const { enhanceConcept } = await import("./enhance.server.ts");
    const enhanced = await enhanceConcept(composed);
    return remember(enhanced);
  });

export const waveConceptsFn = createServerFn({ method: "POST" }).handler(
  async (): Promise<Concept[]> => {
    const wave = composeWave(4);
    return wave.map(remember);
  },
);

export const getGoldFn = createServerFn({ method: "GET" }).handler(
  async (): Promise<GoldQuote> => fetchGold(),
);
