import Header from "../../components/Header";
import Navbar from "../../components/Navbar";

const UpdateMenu = () => {
  return (
    <>
      <Navbar />
      <Header title="MENY" />;
      <h1 className="flex h-screen w-full items-center justify-center bg-orange-100 text-3xl text-teal-900">
        SPAM Update Menu
      </h1>
    </>
  );
};

export default UpdateMenu;
