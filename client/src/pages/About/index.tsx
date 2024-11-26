import Header from "../../components/Header";
import twoPizzas from "../../assets/twoPizzas.png";
import Navbar from "../../components/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <Header title="Vilka är SPAM Pizza?" />
      <main className="flex min-h-screen">
        <aside
          className="w-1/3 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${twoPizzas})`,
          }}
        />
        <section className="min-h-screen flex-1">
          <h1 className="mt-24 block bg-orange-100 px-16 pt-12 text-left font-primary text-2xl text-teal-900">
            Välkommen till SPAM Pizza – där vi tar "spam" till en helt ny nivå!
          </h1>
          <p className="text-l flex w-full items-center justify-center bg-orange-100 px-16 pb-24 text-left font-primary text-teal-900">
            Men oroa dig inte, här handlar det inte om oönskade mejl, utan om
            oemotståndliga pizzor som ingen kan säga nej till. Våra pizzor är
            lika överraskande som ett oväntat mejl i inkorgen – fast på ett gott
            sätt! <br />
            <br />
            Det hela började med en enkel idé: att skapa en take away-restaurang
            där du kan hämta inte bara riktigt bra pizzor utan också en dos
            glädje och lekfullhet. Vår grundare älskade att laga mat som får
            folk att må bra – utan att kompromissa med kvaliteten. Resultatet?
            SPAM Pizza, där vi levererar smak och humor i en perfekt
            kombination.
            <br />
            <br />
            Hos oss står kvalitet och enkelhet i fokus. Vi använder bara de
            bästa ingredienserna och bakar varje pizza med omsorg för att ge dig
            en matupplevelse värd att ta med hem. Våra värderingar är att alltid
            sätta smaken, kunden och ett litet leende i första rummet – för vi
            vet att även take away-mat kan kännas lite extra speciell.
            <br />
            <br />
            Vi vet vad du tänker: "SPAM? Är det inte sånt man försöker undvika?"
            Men här hos oss betyder SPAM bara en sak: rykande varma pizzor,
            krispiga kanter och smaker som får din inbox (eller maggrotta) att
            jubla. Inga filter behövs – bara en hunger för det oväntat goda!
            <br />
            <br />
            Så nästa gång du vill ta med dig något gott hem, låt oss spamma dig
            med smaker du inte visste att du behövde. Välkommen till SPAM Pizza
            – din favorit för god mat, snabbt och enkelt!
          </p>
        </section>
      </main>
    </>
  );
};

export default About;
