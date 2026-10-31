import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FilmProject from "@/components/FilmProject";
import { visions as films, getVision } from "@/lib/visions";
import "@/styles/pages/Film.css";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return films.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const film = getVision((await params).slug);
  return { title: film ? `${film.title} — VF Originals` : "Visions — VF Originals" };
}

export default async function VisionsFilmPage({ params }: Props) {
  const film = getVision((await params).slug);
  if (!film) notFound();
  return <FilmProject film={film} films={films} base="/Visions" section="Visions" />;
}
