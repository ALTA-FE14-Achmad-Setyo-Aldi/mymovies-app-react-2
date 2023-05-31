import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "components/Layout";
import Card, { CardUpcoming } from "components/Card";
import SkeletonLoading from "components/Loading";
import { MovieType } from "utils/types/movie";
import { Carousel } from "react-responsive-carousel";
import { useTitle } from "utils/hooks/useTitle";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  useTitle("Movie??!! - Now Playing Movie");
  const [datas, setDatas] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [upcoming, setUpcoming] = useState<MovieType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(1);
  }, []);

  function fetchData(page: number) {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${
          import.meta.env.VITE_MOVIE_API_KEY
        }&language=en-US&page=${page}`
      )
      .then((data) => {
        const { results, total_pages } = data.data;
        setDatas(results);
        setTotalPage(total_pages);
      })
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => {
        setLoading(false);
      });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${
          import.meta.env.VITE_MOVIE_API_KEY
        }&language=en-US&page=${page}`
      )
      .then((data) => {
        const { results } = data.data;
        setUpcoming(results);
      })
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function fetchUpcomingMovies(page: number) {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${
          import.meta.env.VITE_MOVIE_API_KEY
        }&language=en-US&page=${page}`
      )
      .then((data) => {
        const { results } = data.data;
        setUpcoming(results);
      })
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function nextPage() {
    const newPage = page + 1;
    setPage(newPage);
    fetchData(newPage);
  }

  function prevPage() {
    const newPage = page - 1;
    setPage(newPage);
    fetchData(newPage);
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
      <Carousel
        autoPlay={true}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
      >
        {datas.slice(0, 5).map((data, key) => (
          <div
            key={key}
            className="cursor-pointer"
            onClick={() => {
              navigate(`/movie/${data.id}`);
            }}
          >
            <img
              className="relative"
              style={{ filter: "brightness(50%)" }}
              src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
              alt=""
            />
            <div className="absolute h-full w-full left-auto top-1/3 text-2xl md:text-4xl lg:text-7xl align-middle font-bold tracking-wider">
              {data.title}
            </div>
          </div>
        ))}
      </Carousel>
      <div className="text-center font-bold text-3xl md:text-4xl lg:text-5xl mt-9 text-black">
        <p>Upcoming</p>
      </div>
      <div className="my-9 mx-4 md:mx-16 lg:mx-28">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          slidesPerGroup={3}
          loop={false}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {loading
            ? [...Array(3).keys()].map((data) => <SkeletonLoading key={data} />)
            : upcoming.slice(0, 9).map((data) => (
                <SwiperSlide key={data.id} className="mb-10">
                  <CardUpcoming
                    title={data.title}
                    image={data.poster_path}
                    id={data.id}
                    labelButton="ADD TO FAVORITE"
                    onClickFav={() => handleFavorite(data)}
                  />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
      <div className="text-center font-bold text-3xl md:text-4xl lg:text-5xl mt-9 text-black">
        <p>Now Playing</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 my-9 mx-4 md:mx-16 lg:mx-28">
        {loading
          ? [...Array(20).keys()].map((data) => <SkeletonLoading key={data} />)
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
      <div className="btn-group w-full justify-center">
        <button
          className="btn"
          onClick={() => prevPage()}
          disabled={page === 1}
        >
          ←
        </button>
        <button className="btn">{page}</button>
        <button
          className="btn"
          onClick={() => nextPage()}
          disabled={page === totalPage}
        >
          →
        </button>
      </div>
    </Layout>
  );
};

export default Homepage;
