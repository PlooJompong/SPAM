import { Link } from "react-router-dom";

interface EmployeeMenuProps {
  image: string;
  title: string;
  link: string;
}

const EmployeeMenu: React.FC<EmployeeMenuProps> = ({
  image,
  title,
  link,
}: EmployeeMenuProps) => {
  return (
    <>
      <Link to={`/${link}`}>
        <section className="flex aspect-square w-[300px] flex-col items-center justify-center gap-10 rounded-xl bg-white shadow-md">
          <img src={image} alt="logo" className="aspect-square w-[130px]" />
          <p className="text-3xl">{title}</p>
        </section>
      </Link>
    </>
  );
};

export default EmployeeMenu;
