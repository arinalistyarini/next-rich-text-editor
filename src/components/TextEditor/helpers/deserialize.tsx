// https://docs.slatejs.org/concepts/10-serializing#deserializing
import { jsx } from 'slate-hyperscript';
import { FormatType } from '../text-editor-const';

const deserialize = (html = '') => {
  const document = new DOMParser().parseFromString(html, 'text/html');
  return toNodes(document.body).filter((node) => node.type === FormatType.Paragraph);
};

const toNodes = (el, markAttributes = {}) => {
  if (el.nodeType === Node.TEXT_NODE) {
    return jsx('text', markAttributes, el.textContent);
  } else if (el.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  const nodeAttributes = { ...markAttributes }

  // define attributes for text nodes
  switch (el.nodeName) {
    case 'strong':
      nodeAttributes.bold = true;
  }

  const children = Array.from(el.childNodes)
    .map(node => toNodes(node, nodeAttributes))
    .flat();

  if (children.length === 0) {
    children.push(jsx('text', nodeAttributes, ''));
  }

  switch (el.nodeName) {
    case 'BODY':
      return jsx('fragment', {}, children);
    case 'BR':
      return '\n'
    case 'BLOCKQUOTE':
      return jsx('element', { type: 'quote' }, children);
    case 'P':
      return jsx('element', { type: 'paragraph' }, children);
    case 'A':
      return jsx(
        'element',
        { type: 'link', url: el.getAttribute('href') },
        children,
      )
    default:
      return children;
  }
};

export { deserialize };
