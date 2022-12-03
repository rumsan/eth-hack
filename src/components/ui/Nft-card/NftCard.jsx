import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./nft-card.css";

import Modal from "../Modal/Modal";
import defaultImg from '../../../assets/images/ava-04.png'
import coverImage from '../../../assets/images/img-01.jpg'

const NftCard = (props) => {
  const { title, id, price, creatorImg, imgUrl, creator, symbol } = props.item;

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="single__nft__card">
      <div className="nft__img">
        <img src={imgUrl} alt="" onError={({ currentTarget }) => {
    currentTarget.onerror = null;
    currentTarget.src=coverImage;
  }} className="w-100" />
      </div>

      <div className="nft__content">
        <h5 className="nft__title">
          <Link to={`/market/${id}`}>{title}</Link>
        </h5>

        <div className="creator__info-wrapper d-flex gap-3">
          <div className="creator__img">
            <img src={defaultImg} alt="" className="w-100" />
          </div>

          <div className="creator__info w-100 d-flex align-items-center justify-content-between">
            <div>
              <h6>Created By</h6>
              <p>{creator.substring(0,4)+'...'+creator.substring(creator.length,creator.length-4)}</p>
            </div>

            <div>
              <h6>Price</h6>
              <p>
                {price} {symbol}
              </p>
            </div>
          </div>
        </div>

        <div className=" mt-3 d-flex align-items-center justify-content-between">
          <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={() => setShowModal(true)}
          >
            <i className="ri-shopping-bag-line"></i> Buy Now
          </button>

          {showModal && <Modal setShowModal={setShowModal} />}

          <span className="history__link">
            <Link to="#">View History</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
