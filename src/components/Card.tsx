import { useNavigate } from "react-router-dom";
import { FC, Component } from "react";
import Button from "./Button";
import moment from "moment";

type GenreType = {
  id: number;
  name: string;
};

interface CardProps {
  id?: number;
  title?: string;
  poster_path?: string;
  overview?: string;
  release_date?: string;
  runtime?: number;
  genres?: GenreType[];
  image?: string;
  labelButton?: string;
  onClickFav?: () => void;
  navigate?: any;
  params?: any;
}
const Card: FC<CardProps> = ({ id, image, title, labelButton, onClickFav }) => {
  const navigate = useNavigate();

  function onClickDetail() {
    navigate(`/movie/${id}`);
  }

  return (
    <div className="card card-compact  bg-[#393E46] shadow-xl  hover:scale-105 hover:z-10 duration-300 ">
      <figure onClick={() => onClickDetail()} className="cursor-pointer">
        <img src={`https://image.tmdb.org/t/p/w500${image}`} alt={title} />
      </figure>
      <div className="card-body justify-between">
        <h2
          className="card-title justify-center text-center cursor-pointer"
          onClick={() => onClickDetail()}
        >
          {" "}
          {title}
        </h2>

        <div className="card-actions w-full justify-center">
          <Button label={labelButton} onClick={onClickFav} />
        </div>
      </div>
    </div>
  );
};

export const CardMyFavorite: FC<CardProps> = ({
  id,
  image,
  title,
  labelButton,
  onClickFav,
}) => {
  const navigate = useNavigate();

  function onClickDetail() {
    navigate(`/movie/${id}`);
  }

  return (
    <div className="card card-compact  bg-[#393E46] shadow-xl  hover:scale-105 hover:z-10 duration-300 ">
      <figure onClick={() => onClickDetail()} className="cursor-pointer">
        <img src={`https://image.tmdb.org/t/p/w500${image}`} alt={title} />
      </figure>
      <div className="card-body justify-between">
        <h2
          className="card-title justify-center text-center cursor-pointer"
          onClick={() => onClickDetail()}
        >
          {" "}
          {title}
        </h2>

        <div className="card-actions w-full justify-center">
          <label htmlFor="my-modal" className="btn bg-red-700">
            REMOVE FROM FAVORITE
          </label>
        </div>
      </div>
    </div>
  );
};

export const CardUpcoming: FC<CardProps> = ({
  id,
  image,
  title,
  labelButton,
  onClickFav,
}) => {
  const navigate = useNavigate();

  function onClickDetail() {
    navigate(`/movie/${id}`);
  }

  return (
    <div className="card card-compact  bg-[#393E46] shadow-xl">
      <figure onClick={() => onClickDetail()} className="w-full cursor-pointer">
        <img
          className="h-72 w-full object-none"
          src={`https://image.tmdb.org/t/p/w500${image}`}
          alt={title}
        />
      </figure>
      <div className="card-body justify-between ">
        <h2
          className="card-title justify-center text-center cursor-pointer"
          onClick={() => onClickDetail()}
        >
          {" "}
          {title}
        </h2>

        <div className="card-actions w-full justify-center">
          <Button label={labelButton} onClick={onClickFav} />
        </div>
      </div>
    </div>
  );
};

export const CardDetail: FC<CardProps> = ({
  id,
  image,
  title,
  labelButton,
  onClickFav,
  release_date,
  runtime,
  genres,
  overview,
  poster_path,
}) => {
  return (
    <div className="card lg:card-side glass shadow-xl px-16 py-16 text-[#393E46] dark:text-[#f0e9d2] items-center">
      <figure className="lg:w-[25%]">
        <img
          className="pb-4 lg:p-0"
          src={`https://image.tmdb.org/t/p/w342${poster_path}`}
          alt={title}
        />
      </figure>
      <div className="flex flex-col lg:ml-9 justify-between lg:w-[75%]">
        <div className="text-lg ">
          <h3 className="card-title  justify-center font-extrabold slice text-3xl  mb-5 text-center">
            {title}
          </h3>
          <p>
            {" "}
            <strong>Title:</strong> {title}
          </p>
          <p>
            {" "}
            <strong>Release Date:</strong>{" "}
            {moment(release_date).format("DD MMMM YYYY")}
          </p>
          <p>
            {" "}
            <strong>Runtime:</strong> {runtime}
          </p>
          <p>
            <strong>Genre:</strong>{" "}
            {genres
              ?.map((genre) => {
                return genre.name;
              })
              .join(", ")}
          </p>
          <p className="text-justify break-all">
            {" "}
            <strong>Overview:</strong> {overview}
          </p>
        </div>
        <div className="card-actions justify-end ">
          <button className="btn bg-[#678983]">Watch Now</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
