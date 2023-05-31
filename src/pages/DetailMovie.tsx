import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Layout from "components/Layout";
import Card, { CardDetail } from "components/Card";
import SkeletonLoading from "components/Loading";
import { MovieType } from "utils/types/movie";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useTitle } from "utils/hooks/useTitle";

interface DatasType {
  id: number;
  title: string;
  poster_path: string;
}

type GenreType = {
  id?: number;
  name?: string;
};

interface DataType {
  id?: number;
  title?: string;
  poster_path?: string;
  backdrop_path?: string;
  overview?: string;
  release_date?: string;
  runtime?: number;
  genres?: any;
}

interface PropsType {
  params?: any;
}

export interface VideosType {
  id?: string;
  key?: string;
  name?: string;
}

interface StateType {
  loading: boolean;
  datas: DatasType[];
  data: DataType;
  id_movie: number;
  videos: VideosType[];
}

const DetailMovie: FC = () => {
  const { id_movie } = useParams();
  const [data, setData] = useState<MovieType>({});
  const [datas, setDatas] = useState<MovieType[]>([]);
  const [videos, setVideos] = useState<VideosType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useTitle(`${data.title} - Cinephile`);
  const element = document.getElementById("head");

  useEffect(() => {
    fetchData();
    element?.scrollIntoView({ behavior: "smooth" });
  }, [id_movie]);

  function fetchData() {
    let nowPlaying = `https://api.themoviedb.org/3/movie/now_playing?api_key=${
      import.meta.env.VITE_MOVIE_API_KEY
    }&language=en-US&page=1`;
    let selectedMovie = `https://api.themoviedb.org/3/movie/${id_movie}?api_key=${
      import.meta.env.VITE_MOVIE_API_KEY
    }&language=en-US&append_to_response=videos`;

    const requestNowPlaying = axios.get(nowPlaying);
    const requestSelectedMovie = axios.get(selectedMovie);

    axios
      .all([requestNowPlaying, requestSelectedMovie])
      .then(
        axios.spread((...responses) => {
          const responseNowPlaying = responses[0].data.results;
          const responseSelectedMovie = responses[1].data;
          const responseSelectedMovieTrailer = responses[1].data.videos.results;

          setDatas(responseNowPlaying);
          setData(responseSelectedMovie);
          setVideos(responseSelectedMovieTrailer);
        })
      )
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleFavorite(data: MovieType) {
    const checkExist = localStorage.getItem("FavMovie");

    if (checkExist) {
      let parseFav: MovieType[] = JSON.parse(checkExist);
      let exist = parseFav.filter((clicked) => clicked.id === data.id);
      let inExist = exist[0];

      if (inExist !== undefined) {
        alert("Movie already added in favorite");
        return;
      }
      parseFav.push(data);
      localStorage.setItem("FavMovie", JSON.stringify(parseFav));
    } else {
      localStorage.setItem("FavMovie", JSON.stringify([data]));
      alert("Movie added to favorite");
    }
  }

  return (
    <Layout>
      <div
        id="head"
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
        }}
      >
        <div className="flex justify-center  items-center  p-4 md:p-14 lg:p-28 bg-gradient-to-t from-white  dark:from-black">
          <CardDetail
            key={data.id}
            title={data.title}
            poster_path={data.poster_path}
            overview={data.overview}
            release_date={data.release_date}
            runtime={data.runtime}
            genres={data.genres}
          />
        </div>
      </div>
      <Carousel showStatus={false} showIndicators={false} showThumbs={false}>
        {videos.slice(0, 3).map((data, key) => (
          <div key={key}>
            <iframe
              width="100%"
              height="415"
              src={`https://www.youtube.com/embed/${data.key}`}
              title={data.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ))}
      </Carousel>
      <div className="text-center font-bold text-5xl mt-9 text-black">
        <p>Similar Movie</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 my-9 mx-4 md:mx-16 lg:mx-28">
        {loading
          ? [...Array(8).keys()].map((data) => <SkeletonLoading key={data} />)
          : datas.map((data) => (
              <Card
                key={data.id}
                title={data.title}
                image={data.poster_path}
                id={data.id}
                labelButton="ADD TO FAVORITE"
                onClickFav={() => handleFavorite(data)}
              />
            ))}
      </div>
    </Layout>
  );
};

export default DetailMovie;
