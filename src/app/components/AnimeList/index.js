import Image from "next/image"

const AnimeList = ({title, images}) => {
    return (
        <div className="">
            <Image src={images} alt="..." width={350} height={350} />
            <h3 className="font-bold md:text-xl text-md p-4">{title}</h3>
        </div>
    )
}

export default AnimeList
