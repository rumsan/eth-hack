import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Market from "../pages/Market";
import Create from "../pages/Create";
import ErrorPage from "../pages/404"
import MyCollection from '../pages/MyCollections'

import NftDetails from "../pages/NftDetails";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/market" element={<Market />} />
      <Route path="/create" element={<Create />} />
      <Route path="/my-collections" element={<MyCollection />} />
      <Route path="/nft-detail/:id/chain-id/:chainId" element={<NftDetails />} />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Routers;
