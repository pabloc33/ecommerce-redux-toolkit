import { fireEvent, render, screen } from "@testing-library/react";
import SingleProduct from "../../../src/Components/FiltredProducts/SingleProduct";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { productSlice } from "../../../src/features";
import { expectedState } from "../../fixtures/productsFixture";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

const store = configureStore({
  reducer: {
    products: productSlice.reducer,
  },
  preloadedState: {
    products: expectedState,
  },
});

describe("Pruebas en <SingleProduct />", () => {
  test("debe de mostrarse correactamente con valores por defecto", () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/filteredProducts/T-Shirts/1"]}>
          <Routes>
            <Route
              path="/filteredProducts/:type/:id"
              element={<SingleProduct />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    //screen.debug();
    expect(container).toMatchSnapshot();
  });

  test("debe de seleccionar Add to Cart y llamar addToCart", () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/filteredProducts/T-Shirts/1"]}>
          <Routes>
            <Route
              path="/filteredProducts/:type/:id"
              element={<SingleProduct />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    //screen.debug();
    const addToCartBtn = screen.getByLabelText("addToCart-btn");
    fireEvent.click(addToCartBtn);

    expect(dispatch).toHaveBeenCalledWith({
      type: "cart/addToCart",
      payload: {
        amount: 1,
        color: "black",
        id: "1",
        img: {},
        name: "Casual T-Shirt 1",
        price: 45,
        size: "XL",
        text: "Fashion never stops. There is always the new project, the new opportunity. The important thing is to take your time and not get stressed. I just want to do what I do.",
        totalPrice: 45,
      },
    });
  });
});
