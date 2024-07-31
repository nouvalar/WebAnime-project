export const getAnimeResponse = async() => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}?${query}`)
    const anime = await response.json()
    return anime
}

// bisa ditambahkan lagi ketika butuh memanggil get api lagi contoh:
// export const getReviewResponse = async() => {..}