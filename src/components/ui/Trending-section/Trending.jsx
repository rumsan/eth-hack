import React, { useContext, useEffect, useState, useCallback } from "react";
import { Container, Row, Col, Input } from "reactstrap";
import API from "../../../constants/api";
import { useWeb3React } from "@web3-react/core";

import "./trending.css";
import NftCard from "../Nft-card/NftCard";
import { CovalentContext } from "../../../modules/covalent/context";
import { SYMBOLS } from "../../../constants";

import ContentLoader from "../../Atoms/ContentLoader";
import { CONTRACT_ADDRESS } from "../../../contract/contractAddress";

const Trending = () => {
  const {library} = useWeb3React();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [network, setNetwork] = useState(97);
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
        creatorImg: "../../../assets/images/ava-01.png",
        price: d.tokenData.price,
        symbol: SYMBOLS[`${d.tokenData.network}`],
      };
    });
    return formatted;
  };
  const fetchNftList = useCallback(async () => {
    try {
      setLoading(true);
      if (!network) return;
      const tokenIds = await fetchNftTokenIds({
        chainId: Number(network),
        contract: CONTRACT_ADDRESS.nft[network],
        library
      });
      if (!tokenIds?.length) {
        setList([]);
        setLoading(false);
        return;
      }
      const res = formatNftInfo(tokenIds);
      setList(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [network, fetchNftTokenIds]);

  useEffect(() => {
    fetchNftList();
  }, [fetchNftList]);

  const handleNetworkSelection = (val) => {
    setNetwork(val);
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="mb-5">
            <h3 className="trending__title">Trending NFTs</h3>
          </Col>
          <Col lg="4" className="mb-5">
            <Input
              type="select"
              required
              value={network}
              onChange={(e) => handleNetworkSelection(e.target.value)}
            >
              <option value="97">Binance Testnet</option>
              <option value="80001">Polygon Testnet</option>
            </Input>
          </Col>

          {loading ? (
            <ContentLoader />
          ) : (
            <>
              {list?.length ? (
                list?.map((item, index) => (
                  <Col lg="3" md="4" sm="6" key={index} className="mb-4">
                    <NftCard item={item} />
                  </Col>
                ))
              ) : (
                <h6 className="trending__title">No Nfts found</h6>
              )}
            </>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default Trending;
