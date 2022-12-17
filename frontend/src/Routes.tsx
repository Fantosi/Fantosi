import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import ArtistPage from "./components/ArtistPage";

const MainRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="artist-page/:artistPageToken" element={<ArtistPage />} />
  </Routes>
);

export default MainRoutes;
