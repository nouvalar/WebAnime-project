import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";

const page = async ({ params }) => {
    const { keyword } = params

    const decodeKeyword = decodeURI(keyword) //untuk spasi agar tidak muncul tanda %
    

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/anime?q=${decodeKeyword}`);
    const searchAnime = await response.json()

  return (
    <>
    {/* anime terpopuler */}
    <section>
      <Header title={`Pencarian Untuk ${decodeKeyword}...`} />
      <AnimeList api={searchAnime}/>
    </section>
    </>
   
  )
}

export default page
