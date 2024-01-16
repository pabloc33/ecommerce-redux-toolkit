import { fireEvent, render, screen } from "@testing-library/react";
import ProductCard from "../../../src/Components/FiltredProducts/ProductCard";
import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "../../../src/features";
import { Provider, useDispatch } from "react-redux";
import { MemoryRouter } from "react-router-dom";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

const store = configureStore({
  reducer: {
    products: productSlice.reducer,
  },
});

describe("Pruebas en <ProductCard />", () => {
  test("debe de renderizar el componente correctamente", () => {
    const id = 1;
    const name = "Product 1";
    const text = "This is product 1";
    const img = "image.jpg";
    const price = 10;
    const colors = ["red", "blue", "green"];

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard
            id={id}
            name={name}
            text={text}
            img={img}
            price={price}
            colors={colors}
          />
        </MemoryRouter>
      </Provider>
    );

    //screen.debug();
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByText(`$${price}`)).toBeInTheDocument();
    colors.forEach((color) => {
      expect(screen.getByTestId(`color-${color}`)).toBeInTheDocument();
    });
  });

  test("debe de seleccionar card y llamar singleProduct", () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const id = 1;
    const name = "Product 1";
    const text = "This is product 1";
    const img = "image.jpg";
    const price = 10;
    const colors = ["red", "blue", "green"];

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard
            id={id}
            name={name}
            text={text}
            img={img}
            price={price}
            colors={colors}
          />
        </MemoryRouter>
      </Provider>
    );

    // screen.debug();
    const cardLink = screen.getByLabelText("card-btn");
    fireEvent.click(cardLink);

    expect(dispatch).toHaveBeenCalledWith({
      type: "products/singleProduct",
      payload: 1,
    });
  });
});
