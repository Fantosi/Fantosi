import "./App.css";
import Navbar from "./components/Navbar";
import MainRoutes from "./Routes";
import CatInTheBox from "./components/Footer";
import useWeb3 from "./hooks/useWeb3";
import { useState } from "react";
import { removeUserItem, setUserItem } from "./utils/localstorage";
import { UserInfo } from "./types";

function App() {
  const [user, setUser] = useState<UserInfo | undefined>(undefined);

  const web3 = useWeb3();

  const onClickSignIn = async () => {
    const address = await web3.signInWithWeb3Onboard();
    if (address) {
      const userInfo = { role: "USER", address } as UserInfo;
      setUserItem(userInfo);
      setUser(userInfo);
    }
  };

  const onClickSignOut = async () => {
    await web3.signOutWithWeb3Onboard();
    removeUserItem();
    setUser(undefined);
  };

  return (
    <div className="App">
      <Navbar
        web3={web3}
        user={user}
        onClickSignIn={onClickSignIn}
        onClickSignOut={onClickSignOut}
      />
      <MainRoutes web3={web3} user={user} onClickSignIn={onClickSignIn} />
      <CatInTheBox />
    </div>
  );
}

export default App;
