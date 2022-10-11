import { DefaultElement } from 'slate-react';

import { Image } from './Image';
import { FormatType } from './text-editor-const';

const Element = (props) => {
  const { attributes, children, element } = props;
  const style = { textAlign: element.align };
  switch (element.type) {
    case FormatType.Blockquote:
      return (
        <blockquote
          className={'border-l-4 border-slate-300 pl-4 text-base'}
          style={style}
          {...attributes}
        >
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
        <h1 className={'text-4xl font-bold mb-3'} style={style} {...attributes}>
          {children}
        </h1>
      );
    case FormatType.HeadingTwo:
      return (
        <h2 className={'text-2xl font-bold mb-3'} style={style} {...attributes}>
          {children}
        </h2>
      );
    case FormatType.HeadingThree:
      return (
        <h3 className={'text-lg font-bold mb-3'} style={style} {...attributes}>
          {children}
        </h3>
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
    case FormatType.Link:
      return (
        <a href={element.url} {...attributes}>
          <InlineChromiumBugfix />
            {children}
          <InlineChromiumBugfix />
        </a>
      );
    case FormatType.Image:
      return (
        <Image {...props} />
      );
    default:
      return <DefaultElement {...props} />;
  }
};

// Put this at the start and end of an inline component to work around this Chromium bug:
// https://bugs.chromium.org/p/chromium/issues/detail?id=1249405
const InlineChromiumBugfix = () => (
  <span
    contentEditable={false}
    className="text-[0px] !width-auto"
  >
    ${String.fromCodePoint(160) /* Non-breaking space */}
  </span>
)

export { Element };
