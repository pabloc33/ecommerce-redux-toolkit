import {
  addToCart,
  cartSlice,
  removeFromCart,
} from "../../../src/features/slices/cartSlice";
import {
  cartExpectedState,
  cartExpectedState2,
  cartInitialState,
} from "../../fixtures/cartFixture";

describe("Pruebas en cartSlice", () => {
  test("debe regresar el estado incial y llamarse cart", () => {
    const state = cartSlice.reducer(cartInitialState, {});

    expect(cartSlice.name).toBe("cart");
    expect(state).toEqual(cartInitialState);
  });

  test("should increase amount and total price of existing product, and update total amount and price when adding a product that already exists in the cart", () => {
    const state = cartSlice.reducer(
      cartExpectedState,
      addToCart({
        id: 1,
        price: 10,
        size: "M",
        amount: 1,
        img: "image.jpg",
        totalPrice: 10,
        name: "Product 1",
        text: "Product description",
        color: "red",
      })
    );

    expect(state.cart[0].amount).toBe(2);
    expect(state.totalAmount).toBe(2);
    expect(state.totalPrice).toBe(20);
  });

  test("should decrease amount and total price of existing product, and update total amount and price when removing a product that exists in the cart with amount greater than 1", () => {
    const state = cartSlice.reducer(
      cartExpectedState2,
      removeFromCart({
        id: 1,
        price: 10,
        size: "M",
        amount: 1,
        img: "image.jpg",
        totalPrice: 10,
        name: "Product 1",
        text: "Product description",
        color: "red",
      })
    );

    expect(state.cart.length).toBe(1);
    expect(state.cart[0].amount).toBe(1);
    expect(state.cart[0].totalPrice).toBe(10);
    expect(state.totalAmount).toBe(1);
    expect(state.totalPrice).toBe(10);
  });
});
