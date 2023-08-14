import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Catergory from "./components/Category/Category";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import View from './components/3dView/View'
import NoMatch from "./components/NoMatch";
import AppContext from "./utils/context";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppContext>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/category/:id" element={<Catergory />}></Route>
            <Route path="/product/:id" element={<SingleProduct />}></Route>
            <Route path="/view/:id" element={<View/>}></Route>
            <Route path="*" element={<NoMatch />}></Route>
          </Routes>
          <Footer />
        </AppContext>
      </BrowserRouter>
    </>
  );
}

export default App;
