import AnimeList from "../components/AnimeList";
import Header from "@/components/AnimeList/Header";
import { getAnimeResponse } from "./libs/api-libs";

const page = async () => {
  const topAnime = await getAnimeResponse("top/anime", "limit=8")

  return (
    <>
    {/* anime terpopuler */}
    <section>
      <Header title="Paling Populer" linkTitle="Lihat Semua" linkHref="/populer" />
      <AnimeList api={topAnime}/>
    </section>
    </>
   
  )
}

export default page
