import { createFileRoute } from "@tanstack/react-router";
import { conceptToBrief } from "@/lib/zarpack/brief";
import { findConcept, reconstructFromId } from "@/lib/zarpack/store";

export const Route = createFileRoute("/api/brief/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const concept = findConcept(params.id) ?? reconstructFromId(params.id);
        if (!concept) {
          return new Response("پرونده پیدا نشد.", {
            status: 404,
            headers: { "Content-Type": "text/plain; charset=utf-8" },
          });
        }
        return new Response(conceptToBrief(concept), {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Content-Disposition": `attachment; filename="zarpack-${concept.id}.txt"`,
          },
        });
      },
    },
  },
});
