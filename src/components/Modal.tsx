import React from "react";
import { FC } from "react";

interface CardProps {
  onClickFav?: () => void;
}

export const ModalDeleteFav: FC<CardProps> = ({ onClickFav }) => {
  return (
    <div className="">
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-[#EEEEEE] dark:bg-[#222831] text-[#393E46] dark:text-[#f0e9d2]">
          <h3 className="font-bold text-lg">Confirm!</h3>
          <p className="py-4">Are you sure want remove from favorite?</p>
          <div className="modal-action">
            <label
              htmlFor="my-modal"
              className="btn bg-red-600"
              onClick={onClickFav}
            >
              YES
            </label>
            <label htmlFor="my-modal" className="btn">
              NO
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModalAddFav: FC<CardProps> = ({ onClickFav }) => {
  return (
    <div className="">
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Success!</h3>
          <p className="py-4">Movie added to favorite!</p>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
