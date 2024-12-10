import { Link } from 'react-router-dom';
import pizzaLogo from '../assets/pizzaLogo.png';

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
      <Link to="/">
        <img
          src={pizzaLogo}
          alt="logo"
          className="aspect-square w-[160px] cursor-pointer"
        />
      </Link>

      <div className="w-full bg-[url('/src/assets/border.png')] mb-4">
        <div className="h-[60px]"></div>
      </div>
      <h1 className="text-[2.25rem]">{title}</h1>
    </header>
  );
};

export default CustomerHeader;
