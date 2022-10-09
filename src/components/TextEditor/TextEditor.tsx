// https://github.com/ianstormtaylor/slate/blob/main/site/examples/richtext.tsx
// https://www.slatejs.org/examples/richtext

import { useMemo } from 'react';
import type { Descendant } from 'slate';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, withReact } from 'slate-react';

import { EditArea } from './EditArea';
import { Toolbar } from './Toolbar';

const TextEditor = () => {
  // Create a Slate editor object that won't change across renders.
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const initialValue: Descendant[] = [
    // {
    //   type: 'heading-one',
    //   children: [{ text: 'Heading 1' }],
    // },
    // {
    //   type: 'heading-two',
    //   children: [{ text: 'Heading 2' }],
    // },
    // {
    //   type: 'paragraph',
    //   children: [
    //     { text: 'This is editable ' },
    //     { text: 'rich', bold: true },
    //     { text: ' text, ' },
    //     { text: 'much', italic: true },
    //     { text: ' better than a ' },
    //     { text: '<textarea>', code: true },
    //     { text: '!' },
    //   ],
    // },
    // {
    //   type: 'paragraph',
    //   children: [
    //     {
    //       text: "Since it's rich text, you can do things like turn a selection of text ",
    //     },
    //     { text: 'bold', bold: true },
    //     {
    //       text: ', or add a semantically rendered block quote in the middle of the page, like this:',
    //     },
    //   ],
    // },
    // {
    //   type: 'block-quote',
    //   children: [{ text: 'A wise quote.' }],
    // },
    // {
    //   type: 'paragraph',
    //   align: 'center',
    //   children: [{ text: 'Try it out for yourself!' }],
    // },
    {
      type: 'paragraph',
      children: [
        { text: 'This is editable ' },
        { text: 'rich', bold: true },
        { text: ' text, ' },
        { text: 'much', italic: true },
        { text: ' better than a ' },
        { text: '<textarea>', code: true },
        { text: '!' },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          text: "Since it's rich text, you can do things like turn a selection of text ",
        },
        { text: 'bold', bold: true },
        {
          text: ', or add a semantically rendered block quote in the middle of the page, like this:',
        },
      ],
    },
    {
      type: 'block-quote',
      children: [{ text: 'A wise quote.' }],
    },
    {
      type: 'paragraph',
      align: 'center',
      children: [{ text: 'Try it out for yourself!' }],
    },
  ];

  return (
    <div className="rounded-md border border-slate-300 bg-white">
      <Slate editor={editor} value={initialValue}>
        <Toolbar />
        <EditArea />
      </Slate>
    </div>
  );
};

export { TextEditor };
