import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";
import { getAnimeResponse } from "./libs/api-libs";

const Page = async () => {
  const topAnime = await getAnimeResponse("top/anime", "limit=8")

  return (
    <>
      {/* anime terpopuler */}
      <section>
        <div className="p-4">
          <Header title="Paling Populer" linkTitle="Lihat Semua" linkHref="/populer" />
          <AnimeList api={topAnime}/>
        </div>
      </section>
    </>
  )
}

export default Page
