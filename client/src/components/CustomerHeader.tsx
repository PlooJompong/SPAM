import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import pizzaLogo from "../assets/pizzaLogo.png";

interface CustomerHeaderProps {
  title?: string;
  bgColor?: string;
}

const CustomerHeader: React.FC<CustomerHeaderProps> = ({
  title,
  bgColor,
}: CustomerHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = () => {
    if (location.pathname !== "/Home") {
      // Kontrollera om vi inte redan är på landing
      navigate("/Home"); // Navigera till landing-sidan
    }
  };

  return (
    <header
      className={`flex w-full flex-col items-center justify-center text-center font-primary text-teal-900 ${bgColor}`}
    >
      <Link to="/Home">
        <img
          src={pizzaLogo}
          alt="logo"
          className="aspect-square w-[160px] cursor-pointer"
          onClick={handleNavigation}
        />
      </Link>

      {/* <div className="flex h-[140px] w-full items-center justify-center bg-[url('/src/assets/border.png')]">
        <h1 className="text-[2.25rem]">{title}</h1>
      </div> */}
      <div className="w-full bg-[url('/src/assets/border.png')] mb-4">
        <div className="h-[60px]"></div>
      </div>
      <h1 className="text-[2.25rem]">{title}</h1>
    </header>
  );
};

export default CustomerHeader;
