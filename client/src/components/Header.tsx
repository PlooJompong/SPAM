import React from "react";
import pizzaLogo from "../assets/pizzaLogo.png";
import checkeredPattern from "../assets/checkeredPattern.png";
import { Link } from "react-router-dom";

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="relative h-32 w-full bg-orange-100">
      <div
        className="h20 absolute inset-x-0 top-16 h-40 bg-repeat"
        style={{
          backgroundImage: `url(${checkeredPattern})`,
        }}
      />
      <Link to="/Home">
        <img
          src={pizzaLogo}
          alt="logo"
          className="absolute left-1/2 top-1 h-24 w-24 -translate-x-1/2 transform"
        />
      </Link>
      <div className="absolute top-32 w-full text-center font-primary text-4xl font-bold text-teal-900">
        {title}
      </div>
    </header>
  );
};

export default Header;
