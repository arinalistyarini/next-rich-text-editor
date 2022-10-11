// https://github.com/ianstormtaylor/slate/blob/main/site/examples/richtext.tsx
// https://www.slatejs.org/examples/richtext
// https://www.smashingmagazine.com/2021/05/building-wysiwyg-editor-javascript-slatejs
import { useEffect, useMemo, useState } from 'react';
import { Descendant, Editor, Transforms } from 'slate';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, withReact } from 'slate-react';

import { EditArea } from './EditArea';
import { withInlines } from './helpers/withInlines';
import { FormatType } from './text-editor-const';
import { Toolbar } from './Toolbar';

const TextEditor = ({ value, isEdit = false, onChange }) => {
  const editor = useMemo(
    () => withInlines(withHistory(withReact(createEditor()))),
    []
  );

  const initialValue: Descendant[] = [
    {
      type: FormatType.Paragraph,
      children: [
        { text: '' },
      ],
    },
  ];

  const [editorValue, setEditorValue] = useState((isEdit && value.length) ? [...value] : [...initialValue]);

  useEffect(() => {
    if (isEdit) {
      setEditorValue([...value]);
    } else {
      // https://stackoverflow.com/a/68810943
      Transforms.delete(editor, {
        at: {
          anchor: Editor.start(editor, []),
          focus: Editor.end(editor, []),
        },
      });
    }
  }, [value, isEdit]);

  return (
    <div className="rounded-md border border-slate-300 bg-white">
      <Slate editor={editor} value={editorValue} onChange={onChange}>
        <Toolbar />
        <EditArea />
      </Slate>
    </div>
  );
};

export { TextEditor };
