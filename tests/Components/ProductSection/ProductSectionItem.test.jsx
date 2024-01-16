import { fireEvent, render, screen } from "@testing-library/react";
import ProductSectionItem from "../../../src/Components/ProductSection/ProductSectionItem";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch } from "react-redux";
import { cartSlice } from "../../../src/features";
import { cartInitialState } from "../../fixtures/cartFixture";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
  preloadedState: {
    cart: cartInitialState,
  },
});

describe("Pruebas en <ProductSectionItem />", () => {
  test("debe de renderizar correctamente el componente", () => {
    const props = {
      id: 1,
      img: "invalid-url",
      name: "Product Name",
      text: "Product Description",
      size: ["S", "M", "L"],
      price: 10,
      color: ["red", "blue", "green"],
      totalPrice: 20,
    };

    render(
      <Provider store={store}>
        <ProductSectionItem {...props} />
      </Provider>
    );

    expect(screen.getByText(props.name)).toBeInTheDocument();
    expect(screen.getByText(props.text)).toBeInTheDocument();
    expect(screen.getByText(`${props.size[0]}`)).toBeInTheDocument();
    expect(screen.getByTestId("color-indicator")).toHaveStyle(
      `background-color: ${props.color[0]}`
    );
  });

  test("Add to Cart debe de llamar a addToCart", () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const props = {
      id: 1,
      img: "invalid-url",
      name: "Product Name",
      text: "Product Description",
      size: ["S", "M", "L"],
      price: 10,
      color: ["red", "blue", "green"],
      totalPrice: 20,
    };

    render(
      <Provider store={store}>
        <ProductSectionItem {...props} />
      </Provider>
    );

    const filterBtn = screen.getByLabelText("addToCart-btn");
    fireEvent.click(filterBtn);

    expect(dispatch).toHaveBeenCalled();
  });
});
