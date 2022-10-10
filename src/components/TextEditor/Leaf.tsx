import { FormatType } from './text-editor-const';

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf[FormatType.Bold]) {
    children = <strong>{children}</strong>;
  }

  if (leaf[FormatType.Code]) {
    children = <code className="rounded bg-slate-100 p-1">{children}</code>;
  }

  if (leaf[FormatType.Italic]) {
    children = <em>{children}</em>;
  }

  if (leaf[FormatType.Underline]) {
    children = <u>{children}</u>;
  }

  // The following is a workaround for a Chromium bug where,
  // if you have an inline at the end of a block,
  // clicking the end of a block puts the cursor inside the inline
  // instead of inside the final {text: ''} node
  // https://github.com/ianstormtaylor/slate/issues/4704#issuecomment-1006696364
  const leafClasses = leaf.text === '' ? 'pl-[0.1px]' : '';

  return <span className={leafClasses} {...attributes}>{children}</span>;
};

export { Leaf };
