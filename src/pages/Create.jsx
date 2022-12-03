import React, { useState } from "react";

import { Container, Row, Col, Input } from "reactstrap";
import CommonSection from "../components/ui/Common-section/CommonSection";
import NftCard from "../components/ui/Nft-card/NftCard";
import img from "../assets/images/img-01.jpg";
import avatar from "../assets/images/ava-01.png";
import { SYMBOLS } from "../constants";
import { uploadImage } from "../modules/ipfs/service";
import "../styles/create-item.css";

const item = {
  id: "01",
  title: "Guard",
  desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.",
  imgUrl: img,
  creator: "Trista Francis",
  creatorImg: avatar,
  currentBid: 7.89,
};

const Create = () => {
  const [detail, setDetail] = useState(null);

  const handleInputChange = (name, value) => {
    const newDetail = { ...detail };
    newDetail[`${name}`] = value;
    setDetail({ ...newDetail });
  };

  const handleFileUpload = async (e) => {
    const image = e.target.files[0];
    const img = await uploadImage(image);
    setDetail({ ...detail, image: img });
  };

  console.log(detail);
  return (
    <>
      <CommonSection title="Create Item" />

      <section>
        <Container>
          <Row>
            <Col lg="3" md="4" sm="6">
              <h5 className="mb-4 text-light">Preview Item</h5>
              <NftCard item={item} />
            </Col>

            <Col lg="9" md="8" sm="6">
              <div className="create__item">
                <form>
                  <div className="form__input">
                    <label htmlFor="">Upload File</label>
                    <input
                      type="file"
                      className="upload__input"
                      accept=".png,.jpg"
                      onChange={handleFileUpload}
                    />
                  </div>
                  <div className="form__input">
                    <label htmlFor="">Select Network</label>
                    <Input
                      type="select"
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
                      placeholder="Enter description"
                      className="w-100"
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                    ></textarea>
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
