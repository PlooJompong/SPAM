import { Link } from 'react-router-dom';
import pizzaLogo from '../../assets/pizzaLogo.png';
import pizzaHand from '../../assets/pizzaHand.png';
import pizzaBite from '../../assets/pizzaBite.png';
import pizzaBox from '../../assets/pizzaBox.png';
import CustomerHeader from '../../components/CustomerHeader';
import Container from '../../components/Container';

const Home: React.FC = () => {
  return (
    <>
      <div className="lg:hidden">
        <CustomerHeader title="SPAM PIZZA" />

        <Container>
          <section className="my-5 flex w-full items-center justify-center gap-5">
            <Link to="/menu">
              <button className="rounded-full bg-teal-900 px-8 py-2 text-white">
                Meny
              </button>
            </Link>

            <Link to="/about">
              <button className="rounded-full bg-teal-900 px-8 py-2 text-white">
                Om oss
              </button>
            </Link>
          </section>

          <section className="flex items-center justify-center">
            <img src={pizzaBox} alt="pizzaBox" />
          </section>

          <section className="my-5 flex flex-col gap-3 text-center">
            <h2 className="text-[1.5rem]">ÖPPETTIDER</h2>
            <p>TIS-TORS 12.00-23.00</p>
            <p>FRE-LÖR 12.00-01.00</p>
            <p>SÖN 10.00-18.00</p>
            <p>STORGATAN 17</p>
            <p>08-100 07 00</p>
          </section>
        </Container>
      </div>

      <div className="hidden lg:block">
        <Container>
          <header className="flex h-80 w-full bg-orange-100">
            <img src={pizzaHand} alt="pizzaHand" />
            <div className="flex h-full w-full flex-col justify-center">
              <h1 className="flex justify-center text-center align-middle font-primary text-5xl font-bold text-teal-900">
                SPAM PIZZA
              </h1>
              <img
                src={pizzaLogo}
                alt="logo"
                className="aspect-square w-32 self-center"
              />
            </div>
            <img src={pizzaBite} alt="pizzaBite" />
          </header>

          <main className="mt-40 flex w-full">
            <section className="flex w-1/2 items-center justify-center bg-[url('/src/assets/checkeredPattern.png')] text-center">
              <div className="flex h-40 w-2/3 items-center justify-center border-8 border-teal-900">
                <Link to="/menu">
                  <h2 className="text-[1.5rem]">
                    JAG ÄR HUNGRIG! TA MIG TILL BESTÄLLNINGEN!
                  </h2>
                </Link>
              </div>
            </section>

            <section className="flex w-1/4 flex-col gap-2 text-center">
              <h2 className="text-[1.75rem]">ÖPPETTIDER</h2>
              <p>TIS-TORS 12.00-23.00</p>
              <p>FRE-LÖR 12.00-01.00</p>
              <p>SÖN 10.00-18.00</p>
              <p>STORGATAN 17</p>
              <p>08-100 07 00</p>
              <Link to="/about">
                <p className="underline">Vilka är SPAM?</p>
              </Link>
            </section>

            <img src={pizzaBox} alt="pizzaBox" className="w-1/4" />
          </main>
        </Container>
      </div>
    </>
  );
};

export default Home;
