import isUrl from "is-url";
import Modal from 'react-modal';
import { useCallback, useEffect, useState } from "react";
import { MdClose } from 'react-icons/md';
import { Transforms } from "slate";
import { useSlate } from "slate-react";

import { InputText } from "@/components/InputText";
import { wrapLink } from "./helpers/withInlines";

const LinkInsertion = ({ modal, textToLink, setModal }) => {
  const editor = useSlate();
  const [selectedText, setSelectedText] = useState(textToLink);
  const [isTextDisabled, setIsTextDisabled] = useState(false);
  const [linkURL, setLinkURL] = useState('https://');

  useEffect(() => {
    if (modal) {
      setLinkURL('https://');
      setIsTextDisabled(!!textToLink);
      setSelectedText(textToLink);
    }
  }, [modal])

  const handleCloseModal = () => {
    setModal(false);
  };
  const handleTextInput = useCallback(
    (event) => setSelectedText(event.target.value),
    [setSelectedText]
  );
  const onLinkURLChange = useCallback(
    (event) => setLinkURL(event.target.value),
    [setLinkURL]
  );
  const onApply = useCallback(
    () => {
      const isCursorInEditor = !!editor.selection;
      if (!isCursorInEditor) Transforms.select(editor, {path: [0, 0], offset: 0});
      wrapLink(editor, linkURL, selectedText);

      handleCloseModal();
    },
    [wrapLink, editor, linkURL]
  );

  return (
    <Modal 
      isOpen={modal}
      contentLabel="Insert URL"
      ariaHideApp={false}
      className="w-[400px] p-3 bg-white border border-slate-300 rounded drop-shadow-sm !outline-0 absolute translate-x-[-50%] translate-y-[-50%] top-1/2 left-1/2"
      shouldCloseOnOverlayClick
      onRequestClose={handleCloseModal}
    >
      <div>
        <div className="flex w-full justify-end">
          <MdClose className="text-slate-300 hover:cursor-pointer" fontSize="20px" onClick={handleCloseModal} />
        </div>
        <div className="font-medium">
          Text to be linked
        </div>
        <InputText
          value={selectedText}
          placeholder="Insert text"
          isDisabled={isTextDisabled}
          inputOnChange={handleTextInput}
        />
      </div>
      <div className="mt-3">
        <div className="font-medium">
          Insert URL
        </div>
        <InputText
          value={linkURL}
          isValidateUrl
          placeholder="https://"
          inputOnChange={onLinkURLChange}
        />
      </div>
      <button
        className="w-full mt-5 text-white disabled:bg-gray-500 enabled:bg-blue-700 enabled:hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded text-sm px-2 py-1 text-center"
        disabled={!selectedText || !isUrl(linkURL)}
        onClick={onApply}
      >
        Submit
      </button>
    </Modal>
  );
};

export { LinkInsertion };
