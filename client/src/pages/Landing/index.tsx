import Container from "../../components/Container";
import updateMenu from "../../assets/updateMenu.svg";
import stock from "../../assets/stock.svg";
import orders from "../../assets/orders.svg";
import EmployeeHeader from "../../components/EmployeeHeader";
import EmployeeMenu from "../../components/EmployeeMenu";

const Landing: React.FC = () => {
  return (
    <>
      <EmployeeHeader />

      <Container bgColor="bg-orange-100">
        <main className="my-4 flex h-full w-full flex-wrap items-center justify-center gap-3">
          <EmployeeMenu
            image={updateMenu}
            title="ÄNDRA MENY"
            link="updatemenu"
          />
          <EmployeeMenu image={stock} title="LAGERSTATUS" link="stock" />
          <EmployeeMenu image={orders} title="BESTÄLLNINGAR" link="orders" />
        </main>
      </Container>
    </>
  );
};

export default Landing;
