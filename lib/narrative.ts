export type Credit = { role: string; name: string };

export type Film = {
  slug: string;
  /** rendered in NHG Titles — no &, ×, — or : */
  title: string;
  format: string;
  logline?: string;
  /** YouTube id for the hero player; films without one show `hero` instead */
  youtubeId?: string;
  hero: string;
  cta?: { label: string; href: string };
  credits: Credit[];
  stills: string[];
};

const DIR = "/assets/images/narrative";

export const films: Film[] = [
  {
    slug: "hoopers-asylum",
    title: "Hooper’s Asylum",
    format: "Short Film",
    youtubeId: "iPlMUPBdKpY",
    hero: `${DIR}/web/hoopers-asylum-title.jpg`,
    cta: { label: "Watch on YouTube", href: "https://www.youtube.com/watch?v=iPlMUPBdKpY" },
    credits: [{ role: "Written / Directed by", name: "Oliver Stemmler" }],
    stills: [
      `${DIR}/web/452d1d7a-7a46-43f1-898f-e92b14b24628_rw_3840.jpg`,
      `${DIR}/web/d18ba5c9-db9c-4fb2-83b6-b8f92bf449b7_rw_3840.jpg`,
      `${DIR}/web/f387c407-6616-4405-8930-f15ce3aeb4f8_rw_3840.jpg`,
    ],
  },
  {
    slug: "nowhere-near-home",
    title: "Nowhere Near Home",
    format: "NYU Thesis Film",
    logline:
      "Two feuding brothers are left stranded after school, so they decide to hitchhike home.",
    hero: `${DIR}/Shooting.jpeg`,
    cta: {
      label: "Support the Film",
      href: "https://www.gofundme.com/f/help-bring-olivers-nyu-thesis-film-to-life",
    },
    credits: [{ role: "Written / Directed by", name: "Oliver Stemmler" }],
    stills: [`${DIR}/2mfs.jpeg`, `${DIR}/web/OliverLost.jpg`, `${DIR}/Shooting.jpeg`],
  },
];

export function getFilm(slug: string): Film | undefined {
  return films.find((f) => f.slug === slug);
}
