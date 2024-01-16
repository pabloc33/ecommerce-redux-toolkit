export const cartInitialState = {
  cart: [],
  amount: 0,
  totalAmount: 0,
  totalPrice: 0,
};

export const cartExpectedState = {
  cart: [
    {
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
  ],
  totalAmount: 1,
  totalPrice: 10,
};

export const cartExpectedState2 = {
  cart: [
    {
      id: 1,
      price: 10,
      size: "M",
      amount: 2,
      img: "image.jpg",
      totalPrice: 20,
      name: "Product 1",
      text: "Product description",
      color: "red",
    },
  ],
  totalAmount: 2,
  totalPrice: 20,
};

export const cartExpectedStatePre = {
  cart: [
    {
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
    {
      id: 2,
      price: 15,
      size: "S",
      amount: 1,
      img: "image.jpg",
      totalPrice: 15,
      name: "Product 2",
      text: "Product description",
      color: "blue",
    },
  ],
  totalAmount: 2,
  totalPrice: 25,
};
