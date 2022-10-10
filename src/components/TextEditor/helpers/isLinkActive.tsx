import { Editor, Element as SlateElement } from 'slate';

import { FormatType } from '../text-editor-const';

const isLinkActive = (editor) => {
  const { selection } = editor;
  if (!selection) return false;

  const [link] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === FormatType.Link,
  });
  return !!link;
};

export { isLinkActive };
