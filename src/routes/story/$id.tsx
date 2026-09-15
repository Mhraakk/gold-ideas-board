import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageFrame } from "@/components/page-frame";
import { SiteNav } from "@/components/site-nav";
import { cacheConcept, readCachedConcept } from "@/lib/zarpack/favorites";
import { getConcept } from "@/lib/zarpack/server";
import type { Concept } from "@/lib/zarpack/types";

export const Route = createFileRoute("/story/$id")({
  loader: async ({ params }) => {
    try {
      return await getConcept({ data: { id: params.id } });
    } catch {
      return null;
    }
  },
  component: StoryPage,
});

function StoryPage() {
  const params = Route.useParams();
  const loaded = Route.useLoaderData();
  const [concept, setConcept] = useState<Concept | null>(loaded);

  useEffect(() => {
    if (loaded) {
      cacheConcept(loaded);
      setConcept(loaded);
      return;
    }
    const cached = readCachedConcept(params.id);
    if (cached) setConcept(cached);
  }, [loaded, params.id]);

  if (!concept) {
    return (
      <PageFrame>
        <SiteNav current="/" />
        <p className="text-muted">داستان این بسته پیدا نشد.</p>
      </PageFrame>
    );
  }

  const story = concept.sections.find((s) => s.key === "story");
  const companion = concept.sections.find((s) => s.key === "companion");
  const ritual = concept.sections.find((s) => s.key === "unboxing");

  return (
    <PageFrame>
      <SiteNav current="/" />
      <article className="reveal mx-auto max-w-2xl">
        <p className="label-tech text-muted">STORY</p>
        <h2 className="display mt-2 text-3xl md:text-5xl">{concept.title}</h2>
        <p className="mt-4 text-muted">{concept.lede}</p>
        <img
          src={concept.heroImage}
          alt=""
          className="mt-8 w-full hairline object-cover"
          crossOrigin="anonymous"
        />
        <section className="mt-8 space-y-3">
          <h3 className="display text-2xl">داستان</h3>
          <p className="leading-8 text-fg">{story?.body}</p>
        </section>
        <section className="mt-8 space-y-3 border-t border-line pt-8">
          <h3 className="display text-2xl">همراه بسته</h3>
          <p className="text-sm text-muted">{concept.companionName}</p>
          <p className="leading-8 text-fg">{companion?.body}</p>
          {companion ? (
            <img src={companion.imageUrl} alt="" className="w-full hairline object-cover" crossOrigin="anonymous" />
          ) : null}
        </section>
        <section className="mt-8 space-y-3 border-t border-line pt-8">
          <h3 className="display text-2xl">آیین گشودن</h3>
          <p className="text-sm text-muted">حدود {concept.ritualSeconds} ثانیه</p>
          <p className="leading-8 text-fg">{ritual?.body}</p>
        </section>
        <div className="mt-10 flex flex-wrap gap-2">
          <Link
            to="/concept/$id"
            params={{ id: concept.id }}
            className="inline-flex min-h-11 items-center rounded-[2px] bg-fg px-4 text-sm text-bg"
          >
            پروندهٔ کامل
          </Link>
          <a
            href={`/api/brief/${concept.id}`}
            className="inline-flex min-h-11 items-center rounded-[2px] hairline px-4 text-sm"
          >
            دانلود متن
          </a>
        </div>
      </article>
    </PageFrame>
  );
}
