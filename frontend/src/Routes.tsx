import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import ArtistPage from "./components/ArtistPage";

const MainRoutes = (props: any) => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="artist-page/:artistPageToken" element={<ArtistPage web3={props.web3} />} />
  </Routes>
);

export default MainRoutes;
