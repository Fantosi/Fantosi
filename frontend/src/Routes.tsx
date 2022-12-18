import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import ArtistPage from "./components/ArtistPage";
import { Web3Type } from "./types";

interface MainRoutesProps {
  web3: Web3Type;
}

const MainRoutes = (props: MainRoutesProps) => (
  <Routes>
    <Route path="/" element={<Dashboard web3={props.web3} />} />
    <Route
      path="artist-page/:artistPageToken"
      element={<ArtistPage web3={props.web3} />}
    />
  </Routes>
);

export default MainRoutes;
