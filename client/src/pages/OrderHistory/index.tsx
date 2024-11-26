import Header from "../../components/Header";
import Navbar from "../../components/Navbar";

const OrderHistory = () => {
  return (
    <>
      <Navbar />
      <Header title="Orderhistorik" />
      <main className="primary-font flex h-screen w-full items-center justify-center bg-orange-100 text-3xl text-teal-900"></main>
    </>
  );
};

export default OrderHistory;
