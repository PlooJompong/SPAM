import { Link } from 'react-router-dom';
import pizzaLogo from '../assets/pizzaLogo.png';

interface HeaderProps {
  title: string;
  bgColor?: string;
}

const Header: React.FC<HeaderProps> = ({ title, bgColor }) => {
  return (
    <header
      className={`flex w-full flex-col items-center justify-center text-center font-primary text-teal-900 ${bgColor}`}
    >
      <Link to="/Home">
        <img
          src={pizzaLogo}
          alt="logo"
          className="aspect-square w-[130px] sm:w-[160px]"
        />
      </Link>

      <div className="flex h-[140px] w-full items-center justify-center bg-[url('/src/assets/checkeredPattern.png')]">
        <h1 className="text-[1.75rem]  sm:text-[2.25rem]">{title}</h1>
      </div>
    </header>
  );
};

export default Header;
