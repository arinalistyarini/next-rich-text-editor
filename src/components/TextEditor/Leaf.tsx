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

  return <span {...attributes}>{children}</span>;
};

export { Leaf };
