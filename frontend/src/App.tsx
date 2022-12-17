import "./App.css";
import Navbar from "./components/Navbar";
import MainRoutes from "./Routes";
import CatInTheBox from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <MainRoutes />
      <CatInTheBox />
    </div>
  );
}

export default App;
