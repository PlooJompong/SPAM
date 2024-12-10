interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  autoClose?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  // Kontrollera om meddelandet är för "Order kan inte avbrytas"
  const isOrderLockedOrDone = title === "Order kan inte avbrytas";

  return (
    <section className="fixed inset-0 flex items-center justify-center  bg-gray-500 bg-opacity-75 z-50">
      <article className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
        <p className="mb-4">{message}</p>
        {/* Visa endast knappar om ordern inte är låst */}
        {!isOrderLockedOrDone && (
          <div className="flex justify-between">
            <button
              className="px-2 py-1 bg-red-900 hover:bg-red-800 text-white rounded"
              onClick={onCancel}
            >
              Avbryt
            </button>
            <button
              className="px-2 py-1 bg-teal-900 hover:bg-teal-800 text-white rounded"
              onClick={onConfirm}
            >
              Bekräfta
            </button>
          </div>
        )}
      </article>
    </section>
  );
};

export default Modal;
