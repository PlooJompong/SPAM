import Header from '../../components/Header';
import Container from '../../components/Container';
import twoPizzas from '../../assets/twoPizzas.png';

const About = () => {
  return (
    <>
      <Header title="Vilka är SPAM Pizza?" />

      <Container>
        <main className="flex h-full flex-col items-center justify-center xl:flex-row xl:gap-5">
          <img src={twoPizzas} alt="logo" className="my-4" />

          <section className="flex h-full w-full flex-col items-center justify-center gap-5 text-left">
            <h2 className="text-center text-[1.5rem] sm:text-[1.875rem]">
              SPAM Pizza – där vi tar "spam" till en helt ny nivå!
            </h2>

            <p className="text-[1rem] sm:text-[1.25rem]">
              Men oroa dig inte, här handlar det inte om oönskade mejl, utan om
              oemotståndliga pizzor som ingen kan säga nej till. Våra pizzor är
              lika överraskande som ett oväntat mejl i inkorgen – fast på ett
              gott sätt!
            </p>

            <p className="text-[1rem] sm:text-[1.25rem]">
              Det hela började med en enkel idé: att skapa en take
              away-restaurang där du kan hämta inte bara riktigt bra pizzor utan
              också en dos glädje och lekfullhet. Vår grundare älskade att laga
              mat som får folk att må bra – utan att kompromissa med kvaliteten.
              Resultatet? SPAM Pizza, där vi levererar smak och humor i en
              perfekt kombination.
            </p>

            <p className="text-[1rem] sm:text-[1.25rem]">
              Hos oss står kvalitet och enkelhet i fokus. Vi använder bara de
              bästa ingredienserna och bakar varje pizza med omsorg för att ge
              dig en matupplevelse värd att ta med hem. Våra värderingar är att
              alltid sätta smaken, kunden och ett litet leende i första rummet –
              för vi vet att även take away-mat kan kännas lite extra speciell.
            </p>

            <p className="text-[1rem] sm:text-[1.25rem]">
              Vi vet vad du tänker: "SPAM? Är det inte sånt man försöker
              undvika?" Men här hos oss betyder SPAM bara en sak: rykande varma
              pizzor, krispiga kanter och smaker som får din inbox (eller
              maggrotta) att jubla. Inga filter behövs – bara en hunger för det
              oväntat goda!
            </p>

            <p className="text-[1rem] sm:text-[1.25rem]">
              Så nästa gång du vill ta med dig något gott hem, låt oss spamma
              dig med smaker du inte visste att du behövde. Välkommen till SPAM
              Pizza – din favorit för god mat, snabbt och enkelt!
            </p>
          </section>
        </main>
      </Container>
    </>
  );
};

export default About;
