import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./my-collection-card.css";

import defaultImg from "../../../assets/images/ava-04.png";
import coverImage from "../../../assets/images/img-01.jpg";
import MyToolTip from "../../Atoms/Tooltip"

const MyCollectionCard = (props) => {
  const { isPreview } = props;
  const { title, id, price, imgUrl, creator, symbol } = props?.item;
  const [copied, setCopied] = useState(false);

  const handleSellNft = () => {};

  const handleCopyToClipboard = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(creator).then(
      function () {
        setCopied(true);
      },
      function (err) {
        console.error("ERR:", err);
      },
      setInterval(() => {
        setCopied(false);
      }, 1000)
    );
  };

  console.log(copied)

  return (
    <div className="single__nft__card">
      <div className="nft__img">
        <Link to={`/nft-detail/${id}`}>
          <img
            src={imgUrl}
            alt=""
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = coverImage;
            }}
            className="w-100"
          />
        </Link>
      </div>

      <div className="nft__content">
        <h5 className="nft__title">
          <Link to={isPreview ? "" : `/nft-detail/${id}`}>{title}</Link>
        </h5>

        <div className="creator__info-wrapper d-flex gap-3">
          <div className="creator__img">
            <img src={defaultImg} alt="" className="w-100" />
          </div>

          <div className="creator__info w-100 d-flex align-items-center justify-content-between">
            <div>
              <h6>Created By</h6>
              <Link id="test" onClick={handleCopyToClipboard} className="text-white" style={{textDecoration:'none'}}> 
                {creator.substring(0, 4) +
                  "..." +
                  creator.substring(creator.length, creator.length - 4)}
              </Link>
              <MyToolTip text={"copy"} id="test" />
            </div>

            <div>
              <h6>Price</h6>
              <p>
                {price} {symbol}
              </p>
            </div>
          </div>
        </div>
{/* 
        <div className=" mt-3 d-flex align-items-center justify-content-between">
          <button
            disabled={isPreview === true}
            className="bid__btn d-flex align-items-center gap-1"
            onClick={handleSellNft}
          >
            <i className="ri-hand-coin-line"></i> Sell
          </button>
          <span className="history__link">
            <Link to={`${isPreview ? "#" : "#"}`}>View History</Link>
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default MyCollectionCard;
