import isHotkey from 'is-hotkey';
import { useCallback, useRef } from 'react';
import { Editable, useSlate } from 'slate-react';

import { LinkEditor } from '@/components/TextEditor/LinkEditor';
import { Element } from './Element';
import { toggleMark } from './helpers/toggleMark';
import { Leaf } from './Leaf';
import { FormatType } from './text-editor-const';

const EditArea = () => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useSlate();

  const onTyping = (event) => {
    const HOTKEYS = {
      'mod+b': FormatType.Bold,
      'mod+i': FormatType.Italic,
      'mod+u': FormatType.Underline,
      'mod+`': FormatType.Code,
    };

    Object.keys(HOTKEYS).forEach((hotkey) => {
      if (isHotkey(hotkey, event as any)) {
        event.preventDefault();
        const mark = HOTKEYS[hotkey];
        toggleMark(editor, mark);
      }
    });
  };

  const editorRef = useRef(null);

  return (
    <div className="relative" ref={editorRef}>
      <LinkEditor
        editor={editor}
        editorOffsets={
          editorRef.current
            ? {
                x: editorRef.current.getBoundingClientRect().x,
                y: editorRef.current.getBoundingClientRect().y,
              }
            : { x: 0, y: 0 }
        }
      />
      <Editable
        className="p-3"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        spellCheck
        autoFocus
        placeholder="Enter text here..."
        onKeyDown={onTyping}
      />
    </div>
  );
};

export { EditArea };
