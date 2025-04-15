"use client"

import Image from "next/image";
import Link from "next/link";

const AnimeList = ({ api }) => {
  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 px-4">
      {api.data?.map((anime, index) => {
        return (
          <Link 
            href={`/anime/${anime.mal_id}`} 
            className="cursor-pointer hover:text-yellow-400 transition-all"
            key={index}
          >
            <div className="relative aspect-[3/4] bg-gray-800 rounded-md overflow-hidden">
              <Image
                src={anime.images.webp.large_image_url}
                alt={anime.title}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover rounded-md hover:scale-105 transition-all duration-300 ease-in-out"
                loading="lazy"
                quality={80}
              />
            </div>
            <h3 className="font-medium text-md pt-2 line-clamp-2 dark:text-white text-gray-900">{anime.title}</h3>
          </Link>
        )
      })}
    </div>
  );
};

export default AnimeList;
