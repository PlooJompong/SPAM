import pizzaLogo from "../../assets/pizzaLogo.png";
import pizzaHand from "../../assets/pizzaHand.png";
import pizzaBite from "../../assets/pizzaBite.png";
import pizzaBox from "../../assets/pizzaBox.png";
import checkeredPattern from "../../assets/checkeredPattern.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <header className="relative top-16 flex h-80 w-full bg-orange-100">
        <img src={pizzaHand} alt="" className="h-80" />
        <div className="flex h-full w-full flex-col justify-center">
          <h1 className="flex justify-center text-center align-middle font-primary text-5xl font-bold text-teal-900">
            SPAM PIZZA
          </h1>
          <img
            src={pizzaLogo}
            alt="logo"
            className="left -1/2-translate-x-1/2 h-32 w-32 transform self-center"
          />
        </div>
        <img src={pizzaBite} alt="" className="h-80" />
      </header>
      <main className="h-76 mt-40 flex w-full">
        <section
          className="w-1/2 flex-shrink-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${checkeredPattern})`,
          }}
        >
          <article className="m-auto my-auto flex h-5/6 w-1/2 w-full items-center justify-center border-4 border-teal-900">
            <h2 className="text-center font-primary text-3xl text-teal-900">
              <Link to="/menu">
                JAG ÄR HUNGRIG!
                <br />
                <br />
                TA MIG TILL BESTÄLLNINGEN!
              </Link>
            </h2>
          </article>
        </section>
        <section className="w-1/3 bg-white p-8">
          <h2 className="text-center font-primary text-3xl text-teal-900">
            ÖPPETTIDER
          </h2>
          <p className="text-center font-primary text-teal-900">
            TIS-TORS 12.00-23.00 <br />
            FRE-LÖR 12.00-01.00 <br />
            SÖN 10.00-18.00 <br />
            <br />
            STORGATAN 17 <br />
            <br />
            08-100 007 00 <br />
            <br />
            <Link className="underline" to="/menu">
              MENY
            </Link>
          </p>
        </section>
        <section
          className="w-2/3 max-w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${pizzaBox})`,
          }}
        ></section>
      </main>
    </>
  );
};

export default Home;
