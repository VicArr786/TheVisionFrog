import type { Film } from "@/lib/narrative";

const DIR = "/assets/images/Visions";

/** VF Originals — Visions. Same shape as narrative films; add entries as they're ready. */
export const visions: Film[] = [
  {
    slug: "menend",
    title: "Menend",
    format: "Visions",
    youtubeId: "cSI_2H6JsLs",
    hero: `${DIR}/Menend/web/3.jpg`,
    cta: { label: "Watch on YouTube", href: "https://www.youtube.com/watch?v=cSI_2H6JsLs" },
    credits: [
      { role: "Directed, Produced + Shot by", name: "Oliver Stemmler" },
      { role: "Assistant Producer / 2nd Cam Op", name: "Victor Arroyo" },
      { role: "Edited by", name: "Toni West, Oliver Stemmler" },
    ],
    stills: [`${DIR}/Menend/web/1.jpg`, `${DIR}/Menend/web/2.jpg`, `${DIR}/Menend/web/3.jpg`],
  },
];

export function getVision(slug: string): Film | undefined {
  return visions.find((v) => v.slug === slug);
}
