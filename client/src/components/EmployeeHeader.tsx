import pizzaLogo from "../assets/pizzaLogo.png";

const EmployeeHeader: React.FC = () => {
  return (
    <header className="flex w-full flex-col items-center justify-center bg-orange-100 font-primary text-teal-900">
      <section className="mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-start">
        <div className="flex h-[140px] w-full items-center justify-start">
          <img
            src={pizzaLogo}
            alt="pizza-logo"
            className="aspect-square w-[130px] sm:w-[160px]"
          />
          <h1 className="text-[1.75rem] sm:text-[2.25rem]">SPAM PIZZA</h1>
        </div>

        <h2 className="text-center text-[1.5rem] sm:text-[2rem]">Välkommen</h2>
      </section>
    </header>
  );
};

export default EmployeeHeader;
