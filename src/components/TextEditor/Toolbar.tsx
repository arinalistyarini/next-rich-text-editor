import { useEffect, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';

import { ButtonElement } from './ButtonElement';
import { ButtonLeaf } from './ButtonLeaf';
import { setObjectState } from './helpers/setObjectState';
import { FormatType } from './text-editor-const';

const elementTools = [
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

const leafTools = [
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
  // {
  //   format: FormatType.HeadingOne,
  //   icon: 'MdCode',
  // },
  // {
  //   format: FormatType.HeadingTwo,
  //   icon: 'MdCode',
  // },
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

  return (
    <div className="flex h-[46px] w-full items-center border-b border-slate-300 text-center">
      {spinner[icons] && (
        <div className="flex w-full justify-center p-3">
          <ImSpinner2 className="animate-spin text-gray-400" />
        </div>
      )}
      {elementTools.map((toolbar, index) => (
        <ButtonElement
          key={`buttonElement${index}`}
          format={toolbar.format}
          icon={toolbar.icon}
          isIconShown={handleIsIconShown}
        />
      ))}
      {leafTools.map((toolbar, index) => (
        <ButtonLeaf
          key={`buttonLeaf${index}`}
          format={toolbar.format}
          icon={toolbar.icon}
          isIconShown={handleIsIconShown}
        />
      ))}
    </div>
  );
};

export { Toolbar };
