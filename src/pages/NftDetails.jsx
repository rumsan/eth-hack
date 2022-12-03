import React, { useContext, useState, useEffect } from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import API from "../constants/api";
import { CovalentContext } from "../modules/covalent/context";

import { fetchTokenUri } from "../modules/ipfs/service";

import "../styles/nft-details.css";

import { Link } from "react-router-dom";
import defaultImg from "../assets/images/ava-01.png";

const NftDetails = () => {
  const { id } = useParams();
  const { fetchNftMetadata } = useContext(CovalentContext);
  const [isFetched, setIsFetched] = useState(false);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    async function fetchNftDetail() {
      if (isFetched) return;
      const nft = await fetchNftMetadata({
        chainId: 97,
        contract: "0xf035aa818ee4fd5b15dadbb1c8b66109b6ddf993",
        tokenId: id,
      });
      const ipfsInfo = await fetchTokenUri(
        nft.data.items[0].nft_data[0].external_data.external_url
      );
      const nftData = nft.data.items[0];
      setDetail({ ...nftData, ...ipfsInfo });
      setIsFetched(true);
    }
    fetchNftDetail();
  }, [fetchNftMetadata, isFetched, id]);

  return (
    <>
      <CommonSection title={detail?.name} />

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <img
                src={`${API.IPFS}/${detail?.image}`}
                alt=""
                className="w-100 single__nft-img"
              />
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="single__nft__content">
                <h2>{detail?.name}</h2>

                <div className=" d-flex align-items-center justify-content-between mt-4 mb-4">
                  <div className=" d-flex align-items-center gap-4 single__nft-seen">
                    <span>
                      <i className="ri-eye-line"></i> 234
                    </span>
                    <span>
                      <i className="ri-heart-line"></i> 123
                    </span>
                  </div>

                  <div className=" d-flex align-items-center gap-2 single__nft-more">
                    <span>
                      <i className="ri-send-plane-line"></i>
                    </span>
                    <span>
                      <i className="ri-more-2-line"></i>
                    </span>
                  </div>
                </div>

                <div className="nft__creator d-flex gap-3 align-items-center">
                  <div className="creator__img">
                    <img src={defaultImg} alt="" className="w-100" />
                  </div>

                  <div className="creator__detail">
                    <p>Created By</p>
                    <h6>{detail?.nft_data[0]?.owner}</h6>
                  </div>
                </div>

                <p className="my-4">{detail?.description}</p>
                <button className="singleNft-btn d-flex align-items-center gap-2 w-100">
                  <i className="ri-shopping-cart-line"></i>
                  <Link to="/wallet">Add to cart</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default NftDetails;
