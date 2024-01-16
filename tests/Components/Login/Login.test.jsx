import { fireEvent, render, screen } from "@testing-library/react";
import Login from "../../../src/Components/Login/Login";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch } from "react-redux";
import { authSlice } from "../../../src/features";
import { authInicialState } from "../../fixtures/authFixture";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

const store = configureStore({
  reducer: {
    user: authSlice.reducer,
  },
  preloadedState: {
    user: authInicialState,
  },
});

describe("Pruebas en <Login />", () => {
  test("debe de renderizar correctamente el componente", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    expect(screen.getAllByText("Sign In").length).toBeGreaterThanOrEqual(1);
  });

  test("botón de Sign In debe de llamar login con valores especificos", () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const nameInput = screen.getByLabelText("inputName");
    const passwordInput = screen.getByLabelText("inputPassword");
    const imageInput = screen.getByLabelText("inputImg");
    const signInBtn = screen.getByLabelText("signIn-btn");

    fireEvent.change(nameInput, { target: { value: "John" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(imageInput, {
      target: { value: "https://example.com/image.jpg" },
    });
    fireEvent.click(signInBtn);

    expect(dispatch).toHaveBeenCalledWith({
      type: "auth/login",
      payload: {
        image: "https://example.com/image.jpg",
        name: "John",
        password: "password123",
      },
    });
  });
});
