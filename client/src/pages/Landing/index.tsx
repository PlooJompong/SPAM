import Container from '../../components/Container';
import updateMenu from '../../assets/updateMenu.svg';
import stock from '../../assets/stock.svg';
import orders from '../../assets/orders.svg';
import EmployeeHeader from '../../components/EmployeeHeader';
import EmployeeMenu from '../../components/EmployeeMenu';
import { useAuth } from '../../context/AuthContext';

const Landing: React.FC = () => {
  const { isAdmin } = useAuth();
  return (
    <>
      <EmployeeHeader title="Välkommen" />

      <Container bgColor="bg-orange-100">
        {!isAdmin ? (
          <p className="text-center">Du har inte åtkomst till denna sida.</p>
        ) : (
          <main className="my-4 flex h-full w-full flex-wrap items-center justify-center gap-3">
            <EmployeeMenu
              image={updateMenu}
              title="ÄNDRA MENY"
              link="updatemenu"
            />
            <EmployeeMenu image={stock} title="LAGERSTATUS" link="stock" />
            <EmployeeMenu image={orders} title="BESTÄLLNINGAR" link="orders" />
          </main>
        )}
      </Container>
    </>
  );
};

export default Landing;
