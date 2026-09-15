import { createFileRoute } from "@tanstack/react-router";
import { fetchGold } from "@/lib/zarpack/gold";

export const Route = createFileRoute("/api/gold")({
  server: {
    handlers: {
      GET: async () => Response.json(await fetchGold()),
    },
  },
});
