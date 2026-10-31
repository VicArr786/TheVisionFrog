import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FilmProject from "@/components/FilmProject";
import { films, getFilm } from "@/lib/narrative";
import "@/styles/pages/Film.css";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return films.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const film = getFilm((await params).slug);
  return { title: film ? `${film.title} — VF Originals` : "Narrative — VF Originals" };
}

export default async function NarrativeFilmPage({ params }: Props) {
  const film = getFilm((await params).slug);
  if (!film) notFound();
  return <FilmProject film={film} films={films} base="/Narrative" section="Narrative" />;
}
