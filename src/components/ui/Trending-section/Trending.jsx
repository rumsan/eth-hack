import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import API from "../../../constants/api";

import { NFT__DATA } from "../../../assets/data/data";
import "./trending.css";
import NftCard from "../Nft-card/NftCard";
import { CovalentContext } from "../../../modules/covalent/context";
import { SYMBOLS } from "../../../constants";

const Trending = () => {
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

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <h3 className="trending__title">Trending NFTs</h3>
          </Col>

          {list.map((item, index) => (
            <Col lg="3" md="4" sm="6" key={index} className="mb-4">
              <NftCard item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Trending;
