import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import ArtistPage from "./components/ArtistPage";
import { UserInfo, Web3Type } from "./types";
import TreasuryPage from "./components/TreasuryPage";

interface MainRoutesProps {
  web3: Web3Type;
  user: UserInfo | undefined;
  signIn: () => Promise<void>;
}

const MainRoutes = ({ web3, user, signIn }: MainRoutesProps) => (
  <Routes>
    <Route
      path="/"
      element={<Dashboard web3={web3} user={user} signIn={signIn} />}
    />
    <Route
      path="artist-page/:artistPageToken"
      element={<ArtistPage web3={web3} user={user} signIn={signIn} />}
    />
    <Route
      path="treasury-page/:treasuryId"
      element={<TreasuryPage user={user} signIn={signIn} />}
    />
  </Routes>
);

export default MainRoutes;
