import { getAnimeResponse } from "@/app/libs/api-libs";
import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";

const page = async ({ params }) => {
    const { keyword } = params

    const decodeKeyword = decodeURI(keyword) //untuk spasi agar tidak muncul tanda %
    const searchAnime = await getAnimeResponse("anime", `q=${decodeKeyword}`)

  return (
    <>
    {/* anime terpopuler */}
    <section>
      <Header title={`Pencarian Untuk ${decodeKeyword} !`} />
      <AnimeList api={searchAnime}/>
    </section>
    </>
   
  )
}

export default page
