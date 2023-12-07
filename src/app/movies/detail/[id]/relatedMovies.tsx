import { IP_URL } from "@/config";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function RelatedMovies({ genre, _id }: any) {
  interface MovieRelated {
    _id: string;
    image: string;
  }
  const [movieRelated, setMovieRelated] = useState<MovieRelated[]>([]);
  useEffect(() => {
    fetch(IP_URL + `admin/movieRelated/${genre}/${_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMovieRelated(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [genre]);
  return (
    <div>
      {movieRelated.length > 0 ? (
        movieRelated.map((data, index) => (
          <div className="grid grid-cols-5 gap-1 pt-10 ml-6">
            <div className="col-span-1 z-0" key={index}>
              <Link href={`/movies/detail/${data._id}`}>
                <img
                  className="rounded-lg w-56 h-72 transform scale-100 hover:scale-110 transition-transform duration-300 ease-in-out object-cover"
                  src={data.image}
                  alt=""
                />
              </Link>
            </div>
          </div>
        ))
      ) : (
        <h3 className="text-gray-500 flex mt-6 items-center justify-center text-xl animate-bounce">
          Don't have any film related
        </h3>
      )}
    </div>
  );
}
