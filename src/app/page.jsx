import AnimeList from "../components/AnimeList";
import Header from "../components/AnimeList/Header";
import { getAnimeResponse } from "./libs/api-libs";

const Page = async () => {
  const topAnime = await getAnimeResponse("top/anime", "limit=8")

  return (
    <div className="bg-black min-h-screen pb-8">
      {/* anime terpopuler */}
      <section className="max-w-7xl mx-auto pt-4">
        <Header title="Paling Populer" linkTitle="Lihat Semua" linkHref="/populer" />
        <AnimeList api={topAnime}/>
      </section>
    </div>
  )
}

export default Page
