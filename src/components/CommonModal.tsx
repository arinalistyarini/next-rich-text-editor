import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';

const CommonModal = ({ modal, setModal, children }) => {
  const handleCloseModal = () => {
    setModal(false);
  };

  return (
    <Modal 
      isOpen={modal}
      contentLabel="Insert URL"
      ariaHideApp={false}
      className="max-w-[600px] min-w-[600px] min-h-[400px] p-3 bg-white border border-slate-300 rounded drop-shadow-sm !outline-0 absolute translate-x-[-50%] translate-y-[-50%] top-1/2 left-1/2 z-[5000]"
      shouldCloseOnOverlayClick
      onRequestClose={handleCloseModal}
    >
      <div>
        <div className="flex w-full justify-end mb-2">
          <MdClose className="text-slate-300 hover:cursor-pointer" fontSize="20px" onClick={handleCloseModal} />
        </div>
        { children }
      </div>
    </Modal>
  );
};

export { CommonModal };
