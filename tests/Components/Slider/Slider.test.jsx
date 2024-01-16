import { fireEvent, render, screen } from "@testing-library/react";
import Slider from "../../../src/Components/Slider/Slider";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch } from "react-redux";
import { sliderSlice } from "../../../src/features";
import { sliderInitialState } from "../../fixtures/sliderFixture";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

const store = configureStore({
  reducer: {
    slider: sliderSlice.reducer,
  },
  preloadedState: {
    slider: sliderInitialState,
  },
});

describe("Pruebas en <Slider />", () => {
  test("debe de renderizar correctamente el componente", () => {
    render(
      <Provider store={store}>
        <Slider />
      </Provider>
    );

    // screen.debug();
    expect(
      screen.getByText("Summers SALE up to 50% OFF what are you wating for")
    ).toBeInTheDocument();
  });

  test("should increment the slide index and display the next slide when clicking on the next button", () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Slider />
      </Provider>
    );

    const nextBtn = screen.getByLabelText("next-btn");
    fireEvent.click(nextBtn);

    expect(dispatch).toHaveBeenCalledWith({
      type: "slider/nextSlice",
      payload: 1,
    });
  });
});
