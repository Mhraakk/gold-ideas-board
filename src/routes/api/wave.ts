import { createFileRoute } from "@tanstack/react-router";
import { composeWave } from "@/lib/zarpack/compose";
import { remember } from "@/lib/zarpack/store";

export const Route = createFileRoute("/api/wave")({
  server: {
    handlers: {
      GET: async () => {
        const wave = composeWave(4).map(remember);
        return Response.json({ ok: true, concepts: wave });
      },
    },
  },
});
