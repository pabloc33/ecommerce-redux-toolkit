import logo from "../../assets/images/logo.png";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="flex flex-col items-center justify-center sm:flex-col md:flex-row lg:flex-row xl:flex-row">
      <div className="flex items-center justify-center">
        <hr
          data-testid="hr"
          className="h-px w-4/5 sm:w-1/2 md:w-2/3 lg:w-2/3 xl:w-2/3 bg-gray-400 opacity-50 outline-none border-none"
        />
      </div>

      <div className="flex items-center justify-around pt-4 sm:pt-2 md:pt-4 lg:pt-4 xl:pt-4">
        <div>
          <img
            className="h-20"
            //src={toString(logo)}
            src={logo}
            alt="logo"
          />
        </div>

        <div>
          <p className="text-black text-sm font-inter no-underline normal-case">
            Copyright {year} page by Marko Web
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
