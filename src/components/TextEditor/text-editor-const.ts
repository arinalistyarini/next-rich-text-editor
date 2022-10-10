export enum FormatType {
  Blockquote = 'block-quote',
  BulletedList = 'bulleted-list',
  NumberedList = 'numbered-list',
  HeadingOne = 'heading-one',
  HeadingTwo = 'heading-two',
  Blockcode = 'block-code',
  LeftAlignment = 'left',
  RightAlignment = 'right',
  CenterAlignment = 'center',
  JustifyAlignment = 'justify',
  ListItem = 'list-item',
  Paragraph = 'paragraph',
  Bold = 'bold',
  Code = 'code',
  Italic = 'italic',
  Underline = 'underline',
  Link = 'link',
  Image = 'image',
}

export const LIST_TYPES = [FormatType.NumberedList, FormatType.BulletedList];
export const TEXT_ALIGN_TYPES = [
  FormatType.LeftAlignment,
  FormatType.CenterAlignment,
  FormatType.RightAlignment,
  FormatType.JustifyAlignment,
];
