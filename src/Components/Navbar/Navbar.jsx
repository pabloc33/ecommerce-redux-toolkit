import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "../Cart/Cart";
import { Avatar, avatar } from "@material-tailwind/react";
import { Tooltip } from "@material-tailwind/react";
import logo from "../../assets/images/logo.png";
import { logout } from "../../features";

const Navbar = () => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const user = useSelector((state) => state.user.user);
  const { name, image } = user;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const dispatch = useDispatch();

  return (
    <>
      <div className="bg-black p-2 w-full">
        <h3 className="text-white font-inter text-2xl font-bold tracking-normal leading-none text-center">
          Welcome All
        </h3>
      </div>

      <div className="flex justify-around items-center">
        <div className="mb-4 md:mb-0 md:mr-4">
          <img
            className="h-28 w-full"
            //src={toString(logo)}
            src={logo}
            alt="store"
          />
        </div>

        <div className="flex flex-col md:flex-row items-center">
          <button className="font-inter text-base font-medium tracking-normal leading-none text-center mb-2 md:mr-4 md:mb-0">
            Logout
          </button>

          <div className="flex flex-row items-center mb-2 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="#000"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>

            <p className="font-inter text-base font-medium tracking-normal leading-none text-center">
              Whish List
            </p>
          </div>

          <div
            data-testid="div-handleOpen"
            className="flex flex-row items-center cursor-pointer"
            onClick={handleOpen}
          >
            {totalAmount > 0 ? (
              <span className="rounded-full bg-gray-300 px-2 font-inter text-sm mr-1">
                {totalAmount}
              </span>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="#000"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            )}

            <p className="font-inter text-base font-medium tracking-normal leading-none text-center">
              Shopping bag
            </p>

            <div>
              {open && <Cart openModal={open} setOpen={setOpen}></Cart>}
            </div>
          </div>
          <div className="flex flex-row items-center cursor-pointer pl-4">
            {image && (
              <Avatar src={avatar} alt="avatar" size="sm" className="mr-2" />
            )}
            <div data-testid="signOutClick" onClick={() => dispatch(logout())}>
              <Tooltip content="Sign Out" placement="bottom">
                <p className="font-inter text-sm font-medium tracking-normal leading-none">
                  Hi {name.charAt("0").toUpperCase() + name.slice(1)}
                </p>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black p-4 w-full flex flex-col md:flex-row justify-around">
        <div className="text-white font-inter text-base font-medium tracking-normal leading-none text-center mb-2 md:mb-0">
          50% OFF
        </div>
        <div className="text-white font-inter text-base font-medium tracking-normal leading-none text-center mb-2 md:mb-0">
          Free shipping and returns
        </div>
        <div className="text-white font-inter text-base font-medium tracking-normal leading-none text-center">
          Different payment methods
        </div>
      </div>
    </>
  );
};

export default Navbar;
