import { useCallback } from 'react';
import { Editable } from 'slate-react';

import { Element } from './Element';
import { Leaf } from './Leaf';

const EditArea = () => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  // const onTyping = (event) => {
  //   // for (const hotkey in HOTKEYS) {
  //   //   if (isHotkey(hotkey, event as any)) {
  //   //     event.preventDefault()
  //   //     const mark = HOTKEYS[hotkey]
  //   //     toggleMark(editor, mark)
  //   //   }
  //   // }
  // };

  return (
    <Editable
      className="p-3"
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      spellCheck
      autoFocus
      placeholder="Enter text here..."
      // onKeyDown={onTyping}
    />
  );
};

export { EditArea };
