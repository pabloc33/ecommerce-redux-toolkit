import {
  filterProducts,
  productSlice,
  singleProduct,
} from "../../../src/features/slices/productsSlice";
import {
  expectedState,
  expectedStateSigleProduct,
  productsInicialState,
} from "../../fixtures/productsFixture";

describe("Pruebas en productsSlice", () => {
  test("debe regresar el estado incial y llamarse products", () => {
    const state = productSlice.reducer(productsInicialState, {});

    expect(productSlice.name).toBe("products");
    expect(state).toEqual(productsInicialState);
  });

  test("should filter the products by type and update the state", () => {
    const state = productSlice.reducer(
      productsInicialState,
      filterProducts("T-Shirts")
    );

    expect(state).toEqual(expectedState);
  });

  test("should filter the products by id and update the state", () => {
    const state = productSlice.reducer(
      productsInicialState,
      singleProduct("1")
    );

    expect(state).toEqual(expectedStateSigleProduct);
  });

  test("should throw an error when the payload is not a string in the filterProducts reducer", () => {
    const action = { payload: 123 };

    const state = productSlice.reducer(productSlice, filterProducts(action));
    expect(state.filteredProducts).toStrictEqual([]);
  });
});
