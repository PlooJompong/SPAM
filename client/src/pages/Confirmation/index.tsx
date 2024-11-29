import Header from '../../components/CustomerHeader';
import orderCheck from '../../assets/orderCheck.svg';

const Confirmation = () => {
  return (
    <>
      <Header title="" />
      <div className="flex h-screen flex-col items-center justify-center bg-orange-100">
        <div className="mb-4 flex items-center">
          <img
            src={orderCheck}
            alt="Ordercheck Icon"
            className="mr-4 h-9 w-9 pb-2"
          />
          <h1 className="font-primary text-4xl font-bold text-teal-900">
            Orderbekräftelse
          </h1>
        </div>
        <h4 className="font-primary text-lg text-teal-900">
          Tack för din order!
        </h4>
        <div className="flex w-1/2 flex-col space-y-6 pt-11">
          <div className="flex items-start justify-between pb-2">
            <div>
              <p className="text-lg font-medium text-teal-900">Margerita</p>
              <p className="text-sm text-teal-900">x 1</p>
              <p className="text-sm italic text-gray-500">Kommentar: XXXX</p>
            </div>
            <p className="text-lg font-medium text-teal-900">165 kr</p>
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <p className="text-lg font-bold text-teal-900">Totalt</p>
            <p className="text-lg font-bold text-teal-900">165 kr</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Confirmation;
