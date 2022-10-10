import { Editor, Element as SlateElement } from 'slate';

import { FormatType, TEXT_ALIGN_TYPES } from '../text-editor-const';
import { isLinkActive } from './isLinkActive';

const isBlockActive = (editor, format) => {
  const blockType = TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type';

  const { selection } = editor;
  if (!selection) return false;

  if (format === FormatType.Link) return isLinkActive(editor);

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

export { isBlockActive };
