import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Tooltip, Button } from "@material-tailwind/react";
import { addToCart } from "../../features/slices/cartSlice";

const SingleProduct = () => {
  const product = useSelector((state) => state.products.singleProduct);
  const productSize = product[0].size ? product[0].size[0] : "";
  const productColor = product[0].color[0];
  const [size, setSize] = useState(productSize);
  const [color, setColor] = useState(productColor);

  const { id } = useParams();

  const dispatch = useDispatch();

  return (
    <div>
      {product
        .filter((product) => product.id === id)
        .map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center md:py-10"
            >
              <div className="md:pl-6 lg:pl-12 xl:pl-20 grow-[2]">
                <img
                  className="w-full md:max-w-[450px] lg:max-w-[550px] xl:max-w-[650px] h-auto rounded-lg"
                  //src={toString(item.img)}
                  src={item.img}
                  alt={item.name}
                />
              </div>

              <div className="grow-[3] mt-6 md:mt-0 md:pl-6 lg:pl-12 xl:pl-20">
                <div>
                  <div className="max-w-lg">
                    <h5 className="text-2xl md:text-3xl lg:text-4xl font-inter font-bold tracking-normal leading-normal">
                      {item.name}
                    </h5>

                    <p className="text-orange-700 text-xl md:text-2xl lg:text-3xl font-inter font-bold tracking-normal leading-relaxed pb-4">
                      15% OFF
                    </p>
                    <p className="text-gray-600 text-xl md:text-2xl lg:text-3xl font-inter font-bold tracking-normal leading-relaxed pb-4">
                      {item.text}
                    </p>

                    <div className="pb-4">
                      {item.size ? (
                        <div>
                          <label
                            htmlFor="size"
                            className="block mb-2 text-sm md:text-base font-medium text-gray-900 dark:text-white"
                          >
                            Pick a size
                          </label>
                          <select
                            name="size"
                            id="size"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            className="w-full md:max-w-md lg:max-w-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm md:text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            {item.size.map((item, index) => {
                              return (
                                <option key={index} value={item}>
                                  {item}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      ) : (
                        <div>
                          <label
                            htmlFor="size"
                            className="block mb-2 text-sm md:text-base font-medium text-gray-900 dark:text-white"
                          >
                            Pick a size
                          </label>
                          <select
                            name="size"
                            id="size"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            className="w-full md:max-w-md lg:max-w-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm md:text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            {item?.size?.map((item, index) => {
                              return (
                                <option key={index} value={item}>
                                  {item}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      )}
                    </div>

                    <div className="pb-4">
                      <label
                        htmlFor="color"
                        className="block mb-2 text-sm md:text-base font-medium text-gray-900 dark:text-white"
                      >
                        Pick a color
                      </label>
                      <select
                        id="color"
                        name="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-full md:max-w-md lg:max-w-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm md:text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        {item.color.map((color, index) => {
                          return (
                            <option key={index} value={color}>
                              {color}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <Tooltip content="Add to Cart" placement="bottom">
                      <Button
                        aria-label="addToCart-btn"
                        color="gray"
                        size="lg"
                        variant="outlined"
                        ripple={true}
                        onClick={() =>
                          dispatch(
                            addToCart({
                              id: item.id,
                              name: item.name,
                              img: item.img,
                              text: item.text,
                              size: size,
                              color: color,
                              price: item.price,
                              amount: 1,
                              totalPrice: item.price,
                            })
                          )
                        }
                      >
                        Add to Cart
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SingleProduct;
