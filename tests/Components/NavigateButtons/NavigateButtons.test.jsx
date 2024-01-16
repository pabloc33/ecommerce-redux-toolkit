import { fireEvent, render, screen } from "@testing-library/react";
import NavigateButtons from "../../../src/Components/NavigateButtons/NavigateButtons";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch } from "react-redux";
import { productSlice } from "../../../src/features";
import { expectedState } from "../../fixtures/productsFixture";
import { MemoryRouter } from "react-router-dom";

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

describe("Pruebas en <NavigateButtons />", () => {
  test("debe de renderizar correctamente el componente", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NavigateButtons />
        </MemoryRouter>
      </Provider>
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(8);
  });

  test("button debe de llamar a filterProducts", () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <NavigateButtons />
        </MemoryRouter>
      </Provider>
    );

    //screen.debug();
    const filterBtn = screen.getByLabelText("filterbtn-T-Shirts");
    fireEvent.click(filterBtn);

    expect(dispatch).toHaveBeenCalledWith({
      type: "products/filterProducts",
      payload: "T-Shirts",
    });
  });
});
