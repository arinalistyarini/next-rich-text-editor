import { useEffect } from 'react';
import { Editor, Element as SlateElement, Transforms } from 'slate';
import { useSlate } from 'slate-react';
import { insertImage } from './helpers/insertImage';

import { isBlockActive } from './helpers/isBlockActive';
import { removeImage } from './helpers/removeImage';
import { unwrapLink } from './helpers/withInlines';
import { useButtonClassNames } from './hooks/useButtonClassNames';
import { useGetIcon } from './hooks/useGetIcon';
import { FormatType, LIST_TYPES, TEXT_ALIGN_TYPES } from './text-editor-const';

const ButtonElement = ({ icon, iconToggleOff, format, isIconShown, onSelectedText }) => {
  const slateEditor = useSlate();

  const IconComponent = useGetIcon(icon);
  useEffect(() => {
    isIconShown(format, !!IconComponent);
  }, [IconComponent]);
  const IconToggleOffComponent = iconToggleOff ? useGetIcon(iconToggleOff) : null;

  const isActive = isBlockActive(slateEditor, format);

  const buttonOnClick = (event) => {
    event.preventDefault();
    if (format === FormatType.Link) {
      buttonLinkOnClick();
    } else if (format === FormatType.Image) {
      buttonImageOnClick();
    } else {
      toggleBlock(slateEditor, format);
    }
  };

  const buttonLinkOnClick = () => {
    if (isActive) {
      unwrapLink(slateEditor);
    } else {
      // https://github.com/ianstormtaylor/slate/issues/551
      const selectedText = slateEditor.selection ? Editor.string(slateEditor, slateEditor.selection) : '';
      onSelectedText(selectedText);
    }
  };

  const fileInput = 'file-input';
  const buttonImageOnClick = () => {
    if (!isActive) {
      const fileInputEl = document.querySelector(`#${fileInput}`);
      if (fileInputEl) fileInputEl.click();
    } else {
      const { anchor } = slateEditor.selection;
      const { path } = anchor || [];
      removeImage(slateEditor, [path[0]]);
    }
  };

  const handleImage = (event) => {
    for (const file of event.target.files) {
      const reader = new FileReader();
      const [mime] = file.type.split('/');
      if (mime === 'image') {
        reader.onload = (e) => {
          const src = e.target.result;
          insertImage(slateEditor, src);
        }
        reader.readAsDataURL(file);
      }
    }

    event.target.value = null;
  };

  const buttonClasses = useButtonClassNames(isActive, !!IconComponent);

  const ButtonComponent = () => {
    if (!!iconToggleOff && isActive) return IconToggleOffComponent;

    return IconComponent;
  };

  return (
    <button className={buttonClasses} onMouseDown={buttonOnClick}>
      { format !== FormatType.Image
        ? ButtonComponent()
        :
          <span className="hover:cursor-pointer">
            <label className="hover:cursor-pointer">{ ButtonComponent() }</label>
            <input id={fileInput} className="hidden" accept="image/*" type="file" onChange={handleImage} />
          </span>
      }
    </button>
  );
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      ...(isActive && { align: undefined }),
      ...(!isActive && { align: format }),
    };
  } else {
    newProperties = {
      ...(isActive && { type: FormatType.Paragraph }),
      ...(!isActive && isList && { type: FormatType.ListItem }),
      ...(!isActive && !isList && { type: format }),
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export { ButtonElement };
