import { fireEvent, render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch } from "react-redux";
import Cart from "../../../src/Components/Cart/Cart";
import { cartSlice } from "../../../src/features";
import {
  cartExpectedState,
  cartExpectedStatePre,
  cartInitialState,
} from "../../fixtures/cartFixture";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("Pruebas en <Cart />", () => {
  test("debe de mostrar el componente correctamente", () => {
    const store = configureStore({
      reducer: {
        cart: cartSlice.reducer,
      },
      preloadedState: {
        cart: cartInitialState,
      },
    });

    const openModal = true;
    const setOpen = jest.fn();

    render(
      <Provider store={store}>
        <Cart openModal={openModal} setOpen={setOpen} />
      </Provider>
    );

    // screen.debug();
    expect(screen.getByText("Shopping Bag")).toBeInTheDocument();
    expect(screen.getByText("Your bag is empty")).toBeInTheDocument();
    expect(screen.getByText("Add some products")).toBeInTheDocument();
  });

  test("should render the shopping bag with items and total price when cart is not empty", () => {
    const store = configureStore({
      reducer: {
        cart: cartSlice.reducer,
      },
      preloadedState: {
        cart: cartExpectedState,
      },
    });

    const openModal = true;
    const setOpen = jest.fn();

    render(
      <Provider store={store}>
        <Cart openModal={openModal} setOpen={setOpen} />
      </Provider>
    );

    //screen.debug();
    expect(screen.getByText("Shopping Bag")).toBeInTheDocument();
    expect(screen.getByText("Product 1")).toBeInTheDocument();
  });

  test("botón de Remove debe llamar removeFromCart", () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const store = configureStore({
      reducer: {
        cart: cartSlice.reducer,
      },
      preloadedState: {
        cart: cartExpectedStatePre,
      },
    });

    const openModal = true;
    const setOpen = jest.fn();

    render(
      <Provider store={store}>
        <Cart openModal={openModal} setOpen={setOpen} />
      </Provider>
    );

    const removeBtn = screen.getAllByLabelText("remove-btn")[0];
    fireEvent.click(removeBtn);
    //console.log(store.getState());

    expect(dispatch).toHaveBeenCalledWith({
      type: "cart/removeFromCart",
      payload: {
        id: 1,
        price: 10,
        size: "M",
        amount: 1,
        img: "image.jpg",
        totalPrice: 10,
        name: "Product 1",
        text: "Product description",
        color: "red",
      },
    });
  });
});
