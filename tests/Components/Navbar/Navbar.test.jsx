import { fireEvent, render, screen } from "@testing-library/react";
import Navbar from "../../../src/Components/Navbar/Navbar";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch } from "react-redux";
import { authSlice, cartSlice } from "../../../src/features";
import { authInicialState, userLogin } from "../../fixtures/authFixture";
import { cartExpectedStatePre } from "../../fixtures/cartFixture";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("Pruebas en <Navbar />", () => {
  test("debe de renderizar correctamente el componente", () => {
    const store = configureStore({
      reducer: {
        user: authSlice.reducer,
        cart: cartSlice.reducer,
      },
      preloadedState: {
        user: authInicialState,
      },
    });

    render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );

    expect(screen.getByText("Welcome All")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.getByText("Whish List")).toBeInTheDocument();
    expect(screen.getByText("Shopping bag")).toBeInTheDocument();
  });

  test("should display the user's name and avatar if logged in", () => {
    const store = configureStore({
      reducer: {
        user: authSlice.reducer,
        cart: cartSlice.reducer,
      },
      preloadedState: {
        user: userLogin,
      },
    });

    render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );

    expect(screen.getByText("Hi John")).toBeInTheDocument();
    expect(screen.getByAltText("avatar")).toBeInTheDocument();
  });

  test("should show the shopping bag with the number of items and total amount", () => {
    const store = configureStore({
      reducer: {
        user: authSlice.reducer,
        cart: cartSlice.reducer,
      },
      preloadedState: {
        user: userLogin,
        cart: cartExpectedStatePre,
      },
    });

    render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  test("debe seleccionar Sign Out y llamar logout", () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const store = configureStore({
      reducer: {
        user: authSlice.reducer,
        cart: cartSlice.reducer,
      },
      preloadedState: {
        user: userLogin,
      },
    });

    render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );

    const signOutClick = screen.getByTestId("signOutClick");
    fireEvent.click(signOutClick);

    expect(dispatch).toHaveBeenCalledWith({
      type: "auth/logout",
    });
  });
});
