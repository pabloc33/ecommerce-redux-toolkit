import { fireEvent, render, screen } from "@testing-library/react";
import FiltredProducts from "../../../src/Components/FiltredProducts/FiltredProducts";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch } from "react-redux";
import { productSlice } from "../../../src/features";
import {
  expectedState,
  expectedStateFiltredProducts,
} from "../../fixtures/productsFixture";
import { MemoryRouter, Route, Routes } from "react-router-dom";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("Pruebas en <FiltredProducts />", () => {
  test("debe de renderizar el componente correctamente", () => {
    const store = configureStore({
      reducer: {
        products: productSlice.reducer,
      },
      preloadedState: {
        products: expectedState,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FiltredProducts />
        </MemoryRouter>
      </Provider>
    );

    // screen.debug();
    expect(screen.getByText("male")).toBeInTheDocument();
  });

  test("debe de renderizar el componente correctamente con el error", () => {
    const store = configureStore({
      reducer: {
        products: productSlice.reducer,
      },
      preloadedState: {
        products: expectedStateFiltredProducts,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FiltredProducts />
        </MemoryRouter>
      </Provider>
    );

    //screen.debug();
    expect(screen.getByTestId("error-message")).toBeInTheDocument();
  });

  test("se debe seleccionar a Clear Filter y llamar filterProducts", () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const store = configureStore({
      reducer: {
        products: productSlice.reducer,
      },
      preloadedState: {
        products: expectedState,
      },
    });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/filteredProducts/T-Shirts"]}>
          <Routes>
            <Route
              path="/filteredProducts/:type"
              element={<FiltredProducts />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    //screen.debug();
    const clearBtn = screen.getByLabelText("clear-btn");
    fireEvent.click(clearBtn);

    expect(container.querySelector("h1").textContent).toBe("T-Shirts");
    expect(dispatch).toHaveBeenCalledWith({
      type: "products/filterProducts",
      payload: "T-Shirts",
    });
  });
});
