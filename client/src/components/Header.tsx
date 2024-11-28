import React from "react";
import pizzaLogo from "../assets/pizzaLogo.png";
// import checkeredPattern from "../assets/checkeredPattern.png";
import { Link } from "react-router-dom";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    // <header className="relative h-32 w-full bg-orange-100">
    // <header className="flex w-full flex-col items-center justify-center bg-orange-100 py-2 text-center font-primary text-teal-900">

    <header className="flex w-full flex-col items-center justify-center bg-orange-100 py-2 text-center font-primary text-teal-900">
      {/* <div
        className=""
        style={{
          backgroundImage: `url(${checkeredPattern})`,
        }}
      /> */}

      <Link to="/Home">
        <img
          src={pizzaLogo}
          alt="logo"
          // className="absolute left-1/2 top-1 h-24 w-24 -translate-x-1/2 transform"
          className="aspect-square w-[130px] sm:w-[160px]"
        />
      </Link>

      <div className="bg-checkered-pattern w-full">
        <h1 className="text-[1.75rem] sm:text-[2.25rem]">{title}</h1>
      </div>

      {/* <div className="absolute top-32 w-full text-center font-primary text-4xl font-bold text-teal-900"> */}
      {/* <div className="">{title}</div> */}
    </header>
  );
};

export default Header;
