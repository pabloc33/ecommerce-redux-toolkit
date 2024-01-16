import {
  doSlice,
  nextSlice,
  prevSlice,
  sliderSlice,
} from "../../../src/features/slices/sliderSlice";
import {
  prevInitialState,
  sliderInitialState,
} from "../../fixtures/sliderFixture";

describe("Pruebas en sliderSlice", () => {
  test("debe regresar el estado inicial y llamarse slider", () => {
    const state = sliderSlice.reducer(sliderInitialState, {});

    expect(sliderSlice.name).toBe("slider");
    expect(state).toEqual(sliderInitialState);
  });

  test("should increment state value when calling nextSlice with payload less than sliderData length", () => {
    const state = sliderSlice.reducer(sliderInitialState, nextSlice(2));

    expect(state.value).toBe(2);
  });

  test("should decrement state value by 1 when calling prevSlice with payload greater than or equal to 0", () => {
    const state = sliderSlice.reducer(prevInitialState, prevSlice(0));

    expect(state.value).toBe(0);
  });

  test("should not change state value when calling doSlice", () => {
    const state = sliderSlice.reducer(prevInitialState, doSlice(2));

    expect(state.value).toBe(2);
  });
});
