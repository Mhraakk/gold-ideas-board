import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DealCheckPanel } from "@/components/deal-check";
import { PageFrame } from "@/components/page-frame";
import { SiteNav } from "@/components/site-nav";
import { Button } from "@/components/ui/button";
import { cacheConcept, readCachedConcept, readFavs, toggleFav } from "@/lib/zarpack/favorites";
import { getConcept } from "@/lib/zarpack/server";
import {
  OCCASION_LABEL,
  PRODUCT_LABEL,
  type Concept,
} from "@/lib/zarpack/types";

export const Route = createFileRoute("/concept/$id")({
  loader: async ({ params }) => {
    try {
      return await getConcept({ data: { id: params.id } });
    } catch {
      return null;
    }
  },
  component: ConceptPage,
});

function ConceptPage() {
  const params = Route.useParams();
  const loaded = Route.useLoaderData();
  const [concept, setConcept] = useState<Concept | null>(loaded);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    if (loaded) {
      cacheConcept(loaded);
      setConcept(loaded);
      return;
    }
    const cached = readCachedConcept(params.id);
    if (cached) setConcept(cached);
  }, [loaded, params.id]);

  useEffect(() => {
    setFav(readFavs().includes(params.id));
  }, [params.id]);

  if (!concept) {
    return (
      <PageFrame>
        <SiteNav current="/" />
        <p className="text-muted">این پرونده پیدا نشد.</p>
        <Link to="/" className="mt-4 inline-flex min-h-11 items-center text-sm text-fg underline">
          بازگشت به بورد
        </Link>
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <SiteNav current="/" />
      <div className="reveal grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="label-tech text-muted">
            {OCCASION_LABEL[concept.occasion]} · {PRODUCT_LABEL[concept.productKind]} ·{" "}
            {concept.source === "model" ? "MODEL" : concept.seeded ? "SEED" : "COMPOSE"}
          </p>
          <h2 className="display mt-2 text-3xl md:text-5xl">{concept.title}</h2>
          <p className="mt-3 max-w-xl text-muted">{concept.lede}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              to="/story/$id"
              params={{ id: concept.id }}
              className="inline-flex min-h-11 items-center rounded-[2px] bg-fg px-4 text-sm text-bg"
            >
              داستان بسته
            </Link>
            <a
              href={`/api/brief/${concept.id}`}
              className="inline-flex min-h-11 items-center rounded-[2px] hairline px-4 text-sm"
            >
              دانلود پرونده
            </a>
            <Button
              variant="ghost"
              onClick={() => {
                setFav(toggleFav(concept.id).includes(concept.id));
              }}
            >
              {fav ? "در علاقه‌مندی است" : "علاقه‌مندی"}
            </Button>
          </div>
          <img
            src={concept.heroImage}
            alt={concept.shellName}
            className="mt-6 w-full hairline object-cover"
            crossOrigin="anonymous"
          />
        </div>
        <DealCheckPanel check={concept.dealCheck} />
      </div>

      <ol className="mt-12 space-y-10">
        {concept.sections.map((section, i) => (
          <li key={section.key} className="grid gap-4 border-t border-line pt-8 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="label-tech text-muted">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="display mt-2 text-2xl">{section.title}</h3>
              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted">{section.body}</p>
            </div>
            <img
              src={section.imageUrl}
              alt=""
              className="w-full hairline object-cover"
              crossOrigin="anonymous"
            />
          </li>
        ))}
      </ol>
    </PageFrame>
  );
}
