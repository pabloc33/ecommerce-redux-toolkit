import { storeData } from "../../src/assets/data/dummyData";

export const productsInicialState = {
  filteredProducts: storeData,
  singleProduct: storeData,
  error: false,
};

const action = { payload: "T-Shirts" };
const expectedFilteredProducts = storeData.filter(
  (product) => product.type === action.payload
);
export const expectedState = {
  filteredProducts: expectedFilteredProducts,
  singleProduct:
    JSON.parse(sessionStorage.getItem("singleProduct")) || storeData,
  error: false,
};

const action1 = { payload: "1" };
const expectedSingleProduct = storeData.filter(
  (product) => product.id === action1.payload
);
export const expectedStateSigleProduct = {
  filteredProducts:
    JSON.parse(sessionStorage.getItem("filteredData")) || storeData,
  singleProduct: expectedSingleProduct,
  error: false,
};

export const expectedStateFiltredProducts = {
  filteredProducts: [],
  singleProduct:
    JSON.parse(sessionStorage.getItem("singleProduct")) || storeData,
  error: true,
};
