import { DefaultElement } from 'slate-react';

import { FormatType } from './text-editor-const';

const Element = (props) => {
  const { attributes, children, element } = props;
  const style = { textAlign: element.align };
  switch (element.type) {
    case FormatType.Blockquote:
      return (
        <blockquote className={'text-base'} style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case FormatType.BulletedList:
      return (
        <ul
          className={'list-outside list-disc pl-3 text-base'}
          style={style}
          {...attributes}
        >
          {children}
        </ul>
      );
    case FormatType.HeadingOne:
      return (
        <h1 className={'text-2xl font-bold'} style={style} {...attributes}>
          {children}
        </h1>
      );
    case FormatType.HeadingTwo:
      return (
        <h2 className={'text-xl font-bold'} style={style} {...attributes}>
          {children}
        </h2>
      );
    case FormatType.ListItem:
      return (
        <li className={'text-base'} style={style} {...attributes}>
          {children}
        </li>
      );
    case FormatType.NumberedList:
      return (
        <ol
          className={'my-6 list-outside list-decimal pl-6 text-base'}
          style={style}
          {...attributes}
        >
          {children}
        </ol>
      );
    case FormatType.Paragraph:
      return (
        <p className={'text-base'} style={style} {...attributes}>
          {children}
        </p>
      );
    default:
      return <DefaultElement {...props} />;
  }
};

export { Element };
