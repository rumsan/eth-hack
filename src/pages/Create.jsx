import React, { useEffect, useState, useCallback, useContext } from "react";
import { Container, Row, Col, Input, Button, Spinner } from "reactstrap";
import CommonSection from "../components/ui/Common-section/CommonSection";
import NftCard from "../components/ui/Nft-card/NftCard";
import avatar from "../assets/images/ava-01.png";
import { uploadImage, uploadToIPFS } from "../modules/ipfs/service";
import "../styles/create-item.css";
import API from "../constants/api";
import { useWeb3React } from "@web3-react/core";
import { SYMBOLS } from "../constants";
import { NftContext } from "../modules/nft/context";
import Swal from "sweetalert2";
import { getNetworkConnectParams } from "../utils";

const defaultData = {
  id: "1",
  title: "",
  desc: "",
  imgUrl: "",
  creator: "",
  price: 0,
};

const Create = () => {
  const [detail, setDetail] = useState(null);
  const { account, chainId } = useWeb3React();
  const [preview, setPreview] = useState(defaultData);
  const [image, setImage] = useState(null);
  const { mintAndSellNft } = useContext(NftContext);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = async (name, value) => {
    if (name === "network") {
      if (value !== chainId) {
        const network = await getNetworkConnectParams(value);
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: network.chainId }],
        });
      }
    }
    const newDetail = { ...detail };
    newDetail[`${name}`] = value;
    setDetail({ ...newDetail });
  };

  const handleFileUpload = async (e) => {
    const image = e.target.files[0];
    const img = await uploadImage(image);
    setImage(img);
  };

  const previewUpdate = useCallback(async () => {
    const previewInfo = {
      id: "1",
      title: detail?.name || "",
      desc: detail?.description || "",
      imgUrl: image ? `${API.IPFS}/${image}` : "",
      creator: account || "",
      creatorImg: avatar,
      price: detail?.price || 0,
      symbol: detail?.network ? SYMBOLS[`${detail?.network}`] : "",
    };
    setPreview(previewInfo);
  }, [detail, account, image]);

  const handleCreateNft = async (e) => {
    try {
      e.preventDefault();
      if (!detail) return;
      if (!account)
        return Swal.fire("ERROR", "Please Connect Your Wallet", "error");
      setIsProcessing(true);
      if (detail.network !== chainId) {
        const network = await getNetworkConnectParams(detail.network);
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: network.chainId }],
        });
      }
      const metadata = {
        name: detail.name,
        description: detail.description,
        network: detail.network,
        image,
      };
      const tokenUri = await uploadToIPFS(metadata);
      await mintAndSellNft({ price: detail.price, tokenUri });
      Swal.fire("SUCCESS", "NFT Minting Success", "success");
      setDetail(null);
      setPreview(defaultData);
      setIsProcessing(false);
    } catch (error) {
      console.log(error);
      Swal.fire("ERROR", "NFT Minting Failed", "error");
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    previewUpdate();
  }, [previewUpdate]);
  return (
    <>
      <CommonSection title="Create NFT" />

      <section>
        <Container>
          <Row>
            <Col lg="3" md="4" sm="6">
              <h5 className="mb-4 text-light">Preview NFT</h5>
              <NftCard item={preview} isPreview={true} />
            </Col>

            <Col lg="9" md="8" sm="6">
              <div className="create__item">
                <form onSubmit={handleCreateNft}>
                  <div className="form__input">
                    <label htmlFor="">Upload File</label>
                    <input
                      type="file"
                      required
                      className="upload__input"
                      accept=".png,.jpg"
                      onChange={handleFileUpload}
                    />
                  </div>
                  <div className="form__input">
                    <label htmlFor="">Select Network</label>
                    <Input
                      type="select"
                      required
                      value={detail?.network}
                      onChange={(e) =>
                        handleInputChange("network", e.target.value)
                      }
                    >
                      <option value="">Select Network</option>
                      <option value="97">Binance Testnet</option>
                      <option value="80001">Polygon Testnet</option>
                    </Input>
                  </div>
                  <div className="form__input">
                    <label htmlFor="">Price</label>
                    <input
                      type="number"
                      step="any"
                      required
                      placeholder="Enter price"
                      onChange={(e) =>
                        handleInputChange("price", e.target.value)
                      }
                    />
                  </div>
                  <div className="form__input">
                    <label htmlFor="">Title</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter NFT title"
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                    />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Description</label>
                    <textarea
                      rows="6"
                      required
                      placeholder="Enter description"
                      className="w-100"
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                    ></textarea>
                  </div>
                  <div className="form__input">
                    {isProcessing ? (
                      <Spinner animation="border" variant="primary" />
                    ) : (
                      <>
                        <Button color="primary" type="submit">
                          Create NFT
                        </Button>
                      </>
                    )}
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Create;
