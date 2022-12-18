import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import ArtistPage from "./components/ArtistPage";
import { UserInfo, Web3Type } from "./types";

interface MainRoutesProps {
  web3: Web3Type;
  user: UserInfo | undefined;
  onClickSignIn: () => Promise<void>;
}

const MainRoutes = ({ web3, user, onClickSignIn }: MainRoutesProps) => (
  <Routes>
    <Route
      path="/"
      element={
        <Dashboard web3={web3} user={user} onClickSignIn={onClickSignIn} />
      }
    />
    <Route
      path="artist-page/:artistPageToken"
      element={
        <ArtistPage web3={web3} user={user} onClickSignIn={onClickSignIn} />
      }
    />
  </Routes>
);

export default MainRoutes;
