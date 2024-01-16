import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { filterProducts } from "../../features";
import clothes from "../../assets/images/clothes.jpg";

const NavigateButtons = () => {
  const dispatch = useDispatch();

  const buttons = [
    "Hoodies",
    "Dresses",
    "Suits",
    "Shoes",
    "T-Shirts",
    "Jeans",
    "Jackets",
    "Bags",
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center py-4">
        {buttons.map((button, index) => {
          return (
            <div key={index} className="mb-4 mr-2">
              <Link to={`/filteredProducts/${button}`}>
                <Button
                  aria-label={`filterbtn-${button}`}
                  color="gray"
                  size="lg"
                  variant="outlined"
                  ripple={true}
                  className="text-black hover:bg-gray-300 duration-300 ease-in-out"
                  onClick={() => dispatch(filterProducts(button))}
                >
                  {button}
                </Button>
              </Link>
            </div>
          );
        })}
      </div>

      <div className="bg-green-300 p-2 md:w-2/3 lg:w-1/2 mx-auto rounded-md">
        <h3 className="text-orange-900 text-center text-lg font-inter font-bold tracking-normal leading-none">
          SALES UP 50%
        </h3>
      </div>

      <div className="flex justify-center item-center py-4">
        <img
          className="h-auto w-full md:max-h-[600px] lg:w-3/4 rounded-md shadow-lg shadow-gray-600"
          src={clothes}
          //src={toString(clothes)}
          alt="clothes"
        />
      </div>
    </div>
  );
};

export default NavigateButtons;
