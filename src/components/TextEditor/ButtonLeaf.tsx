import { useEffect } from 'react';
import { Editor, Element as SlateElement, Transforms } from 'slate';
import { useSlate } from 'slate-react';

import { useButtonClassNames } from './hooks/useButtonClassNames';
import { useGetIcon } from './hooks/useGetIcon';
import { FormatType } from './text-editor-const';

const ButtonLeaf = ({ icon, format, isIconShown }) => {
  const slateEditor = useSlate();

  const IconComponent = useGetIcon(icon);
  useEffect(() => {
    isIconShown(format, !!IconComponent);
  }, [IconComponent]);

  const isActive = getIsBlockActive(slateEditor, format);

  const buttonOnClick = (event) => {
    event.preventDefault();
    toggleBlock(slateEditor, format);
  };

  const buttonClasses = useButtonClassNames(isActive, !!IconComponent);

  return (
    <button className={buttonClasses} onMouseDown={buttonOnClick}>
      {IconComponent}
    </button>
  );
};

const getIsBlockActive = (editor, format) => {
  return isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
  );
};

const LIST_TYPES = [FormatType.NumberedList, FormatType.BulletedList];
const TEXT_ALIGN_TYPES = [
  FormatType.LeftAlignment,
  FormatType.CenterAlignment,
  FormatType.RightAlignment,
  FormatType.JustifyAlignment,
];

const isBlockActive = (editor, format, blockType = 'type') => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  );

  return !!match;
};

const toggleBlock = (editor, format) => {
  const isActive = getIsBlockActive(editor, format);
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

export { ButtonLeaf };
