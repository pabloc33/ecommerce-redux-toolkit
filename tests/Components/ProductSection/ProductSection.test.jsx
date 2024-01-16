import { render, screen } from "@testing-library/react";
import ProductSection from "../../../src/Components/ProductSection/ProductSection";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { cartSlice } from "../../../src/features";
import { cartInitialState } from "../../fixtures/cartFixture";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
  preloadedState: {
    cart: cartInitialState,
  },
});

describe("Pruebas en <ProductSection />", () => {
  test("debe de renderizar correctamente el componente", () => {
    render(
      <Provider store={store}>
        <ProductSection />
      </Provider>
    );

    const title = screen.getByRole("heading", {
      name: /summer t-shirt sale 30%/i,
    });

    expect(title).toBeInTheDocument();
  });
});
