import "./App.css";
import Navbar from "./components/Navbar";
import MainRoutes from "./Routes";
import CatInTheBox from "./components/Footer";
import useWeb3 from "./hooks/useWeb3";

function App() {
  const web3 = useWeb3()
  return (
    <div className="App">
      <Navbar web3={web3} />
      <MainRoutes web3={web3} />
      <CatInTheBox />
    </div>
  );
}

export default App;
