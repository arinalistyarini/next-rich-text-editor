import isUrl from 'is-url';
import { Editor, Element as SlateElement, Range, Transforms } from 'slate';

import { FormatType } from '../text-editor-const';
import { isLinkActive } from './isLinkActive';

const withInlines = (editor) => {
  const { insertData, insertText, isInline, isVoid } = editor;

  editor.isInline = (element) =>
    [FormatType.Link].includes(element.type) || isInline(element);

  editor.isVoid = (element) => {
    return element.type === FormatType.Image || isVoid(element);
  }

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');

    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const unwrapLink = (editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === FormatType.Link,
  });
};

const wrapLink = (editor, url: String) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: FormatType.Link,
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

export { withInlines, wrapLink, unwrapLink };
