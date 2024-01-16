import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Components/Main/Main";
import FiltredProducts from "./Components/FiltredProducts/FiltredProducts";
import SingleProduct from "./Components/FiltredProducts/SingleProduct";
import Login from "./Components/Login/Login";
import { useSelector } from "react-redux";
import "./App.css";

function App() {
  const user = useSelector((state) => state.user.user);
  const { authUser } = user;

  return (
    <>
      <div className="">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={authUser ? <Main /> : <Login />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/filteredProducts/:type"
              element={<FiltredProducts />}
            />
            <Route
              path="/filteredProducts/:type/:id"
              element={<SingleProduct />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
