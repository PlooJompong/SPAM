import { Link } from "react-router-dom";
import pizzaLogo from "../assets/pizzaLogo.png";

interface CustomerHeaderProps {
  title?: string;
  bgColor?: string;
}

const CustomerHeader: React.FC<CustomerHeaderProps> = ({
  title,
  bgColor,
}: CustomerHeaderProps) => {
  return (
    <header
      className={`flex w-full flex-col items-center justify-center text-center font-primary text-teal-900 ${bgColor}`}
    >
      <Link to="/Home">
        <img src={pizzaLogo} alt="logo" className="aspect-square w-[160px]" />
      </Link>

      <div className="flex h-[140px] w-full items-center justify-center bg-[url('/src/assets/checkeredPattern.png')]">
        <h1 className="text-[2.25rem]">{title}</h1>
      </div>
    </header>
  );
};

export default CustomerHeader;
