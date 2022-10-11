import { useCallback, useEffect, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';

import { ButtonElement } from './ButtonElement';
import { ButtonLeaf } from './ButtonLeaf';
import { setObjectState } from './helpers/setObjectState';
import { FormatType } from './text-editor-const';
import { LinkInsertion } from "./LinkInsertion";

const leafTools = [
  {
    format: FormatType.Bold,
    icon: 'MdFormatBold',
  },
  {
    format: FormatType.Italic,
    icon: 'MdFormatItalic',
  },
  {
    format: FormatType.Underline,
    icon: 'MdFormatUnderlined',
  },
  {
    format: FormatType.Code,
    icon: 'MdCode',
  },
];

const elementTools = [
  {
    format: FormatType.HeadingOne,
    icon: 'MdLooksOne',
  },
  {
    format: FormatType.HeadingTwo,
    icon: 'MdLooksTwo',
  },
  {
    format: FormatType.HeadingThree,
    icon: 'MdLooks3',
  },
  {
    format: FormatType.Blockquote,
    icon: 'MdFormatQuote',
  },
  {
    format: FormatType.BulletedList,
    icon: 'MdFormatListBulleted',
  },
  {
    format: FormatType.NumberedList,
    icon: 'MdFormatListNumbered',
  },
  {
    format: FormatType.LeftAlignment,
    icon: 'MdFormatAlignLeft',
  },
  {
    format: FormatType.CenterAlignment,
    icon: 'MdFormatAlignCenter',
  },
  {
    format: FormatType.RightAlignment,
    icon: 'MdFormatAlignRight',
  },
  {
    format: FormatType.JustifyAlignment,
    icon: 'MdFormatAlignJustify',
  },
  {
    format: FormatType.Link,
    icon: 'MdInsertLink',
    iconToggleOff: 'MdLinkOff',
  },
  {
    format: FormatType.Image,
    icon: 'MdOutlineImage',
    iconToggleOff: 'MdOutlineHideImage',
  },
];

const Toolbar = () => {
  const icons = 'icons';

  const [iconStates, setIconStates] = useState({});
  const [spinner, setSpinner] = useState({
    [icons]: true,
  });

  // https://stackoverflow.com/a/61242889
  const handleIsIconShown = (format: String, isShown: Boolean) => {
    setSpinner((previousState) => setObjectState(previousState, icons, true));
    setIconStates((previousState = {}) =>
      setObjectState(previousState, format, isShown)
    );
  };

  useEffect(() => {
    const isLoadedDone =
      Object.values(iconStates).length &&
      !Object.values(iconStates).some((state) => !state);
    if (isLoadedDone) {
      setSpinner((previousState) =>
        setObjectState(previousState, icons, false)
      );
    }
  }, [iconStates]);

  // insert new link
  const [selectedText, setSelectedText] = useState({});
  const [modalInsertURL, setModalInsertURL] = useState(false);
  const handleSelectedText = useCallback((text) => {
    setModalInsertURL(true);
    setSelectedText(text);
  }, [setModalInsertURL, setSelectedText]);
  const handleModal = useCallback((modal) => setModalInsertURL(modal), [setModalInsertURL]);

  return (
    <div className="flex h-[46px] w-full items-center border-b border-slate-300 text-center">
      {spinner[icons] && (
        <div className="flex w-full justify-center p-3">
          <ImSpinner2 className="animate-spin text-gray-400" />
        </div>
      )}
      {leafTools.map((toolbar, index) => (
        <ButtonLeaf
          key={`buttonLeaf${index}`}
          format={toolbar.format}
          icon={toolbar.icon}
          isIconShown={handleIsIconShown}
        />
      ))}
      {elementTools.map((toolbar, index) => (
        <ButtonElement
          key={`buttonElement${index}`}
          format={toolbar.format}
          icon={toolbar.icon}
          iconToggleOff={toolbar.iconToggleOff}
          isIconShown={handleIsIconShown}
          onSelectedText={handleSelectedText}
        />
      ))}
      <LinkInsertion modal={modalInsertURL} textToLink={selectedText} setModal={handleModal} />
    </div>
  );
};

export { Toolbar };
