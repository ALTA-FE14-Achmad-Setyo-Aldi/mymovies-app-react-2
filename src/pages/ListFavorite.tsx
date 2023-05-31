import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import Layout from "components/Layout";
import Card, { CardMyFavorite } from "components/Card";
import { MovieType } from "utils/types/movie";
import { useTitle } from "utils/hooks/useTitle";
import { RootState } from "utils/types/redux";
import { setFavorites } from "utils/redux/reducers/reducer";
import { ModalDeleteFav } from "components/Modal";

interface PropsType {}

interface StateType {
  loading: boolean;
  datas: MovieType[];
}

const ListFavorite = () => {
  const dispatch = useDispatch();
  useTitle("Cinephile - Your Favorite Movie");
  const datas = useSelector((state: RootState) => state.data.favorites);

  function removeFavorite(data: MovieType) {
    let dupeDatas: MovieType[] = datas.slice();
    const filterData = dupeDatas.filter((item) => item.id !== data.id);
    localStorage.setItem("FavMovie", JSON.stringify(filterData));
    dispatch(setFavorites(filterData));
  }

  return (
    <Layout>
      <div className="">
        <div className="text-center font-bold text-5xl mt-9 text-black">
          <p>My Favorite</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 my-9 mx-4 md:mx-16 lg:mx-28 ">
          {datas.map((data) => (
            <div>
              <CardMyFavorite
                key={data.id}
                title={data.title}
                image={data.poster_path}
                id={data.id}
              />
              <ModalDeleteFav onClickFav={() => removeFavorite(data)} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ListFavorite;
