import { createFileRoute } from "@tanstack/react-router";
import { composeConcept } from "@/lib/zarpack/compose";
import { guardGenerate } from "@/lib/zarpack/guardrails";
import { remember } from "@/lib/zarpack/store";

export const Route = createFileRoute("/api/generate")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown = {};
        try {
          body = await request.json();
        } catch {
          body = {};
        }
        const guarded = guardGenerate((body ?? {}) as Record<string, unknown>);
        if (!guarded.ok) {
          return Response.json({ ok: false, error: guarded.reason }, { status: 400 });
        }
        const composed = composeConcept(guarded.value, Date.now());
        const { enhanceConcept } = await import("@/lib/zarpack/enhance.server.ts");
        const enhanced = await enhanceConcept(composed);
        remember(enhanced);
        return Response.json({ ok: true, concept: enhanced });
      },
    },
  },
});
