import React, { useState,useContext,useEffect} from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
import API from "../constants/api";
import { SYMBOLS } from "../constants";


import { CovalentContext } from "../modules/covalent/context";
import NftCard from "../components/ui/Nft-card/NftCard";


import { Container, Row, Col } from "reactstrap";

import "../styles/market.css";

const Market = () => {
  const handleCategory = () => {};
  const handleItems = () => {};
  const [isFetched, setIsFetched] = useState(false);
  const [list, setList] = useState([]);
  const { fetchNftTokenIds } = useContext(CovalentContext);
  const formatNftInfo = (nfts) => {
    if (!nfts?.length) return;
    const formatted = nfts?.map((d) => {
      return {
        id: d.token_id,
        title: d.tokenData.name,
        desc: d.tokenData.description,
        imgUrl: `${API.IPFS}/${d.tokenData.image}`,
        creator: d.owner,
        creatorImg:"../../../assets/images/ava-01.png",
        price: d.tokenData.price,
        symbol: SYMBOLS[`${d.tokenData.network}`],
      };
    });
    return formatted;
  };

  useEffect(() => {
    async function fetchNftList() {
      if (isFetched) return;
      const tokenIds = await fetchNftTokenIds({
        chainId: 97,
        contract: "0xf035aa818ee4fd5b15dadbb1c8b66109b6ddf993",
      });
      setIsFetched(true);
      const res = formatNftInfo(tokenIds);
      setList(res);
    }
    fetchNftList();
  }, [isFetched, fetchNftTokenIds]);

  // ====== SORTING DATA BY HIGH, MID, LOW RATE =========
  const handleSort = (e) => {

  };

  return (
    <>
      <CommonSection title={"MarketPlace"} />

      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="market__product__filter d-flex align-items-center justify-content-between">
                <div className="filter__left d-flex align-items-center gap-5">
                  <div className="all__category__filter">
                    <select onChange={handleCategory}>
                      <option>All Categories</option>
                      <option value="art">Art</option>
                      <option value="music">Music</option>
                      <option value="domain-name">Domain Name</option>
                      <option value="virtual-world">Virtual World</option>
                      <option value="trending-card">Trending Cards</option>
                    </select>
                  </div>

                  <div className="all__items__filter">
                    <select onChange={handleItems}>
                      <option>All Items</option>
                      <option value="single-item">Single Item</option>
                      <option value="bundle">Bundle</option>
                    </select>
                  </div>
                </div>

                <div className="filter__right">
                  <select onChange={handleSort}>
                    <option>Sort By</option>
                    <option value="high">High Rate</option>
                    <option value="mid">Mid Rate</option>
                    <option value="low">Low Rate</option>
                  </select>
                </div>
              </div>
            </Col>

            {list?.map((item) => (
              <Col lg="3" md="4" sm="6" className="mb-4" key={item.id}>
                <NftCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Market;
