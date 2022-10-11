import isUrl from "is-url";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdClose } from 'react-icons/md';
import { Editor, Element as SlateElement, Transforms } from "slate";
import { ReactEditor } from "slate-react";

import { isLinkActive } from './helpers/isLinkActive';
import { InputText } from "@/components/InputText";
import { FormatType } from "./text-editor-const";

const LinkEditor = ({ editor, editorOffsets }) => {
  const linkEditorRef = useRef(null);
  const isActive = isLinkActive(editor);

  const [getSelection] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === FormatType.Link,
  });
  const [linkNode, path] = getSelection || [{ url: 'https://' }];

  useEffect(() => {
    const linkEditorEl = linkEditorRef.current;
    if (!isActive || !linkEditorEl || Object.keys(linkNode).length <= 1) {
      return;
    }

    const linkDOMNode = ReactEditor.toDOMNode(editor, linkNode);
    const {
      x: nodeX,
      height: nodeHeight,
      y: nodeY,
    } = linkDOMNode.getBoundingClientRect();

    linkEditorEl.style.display = 'block';
    linkEditorEl.style.top = `${nodeY + nodeHeight - editorOffsets.y}px`;
    linkEditorEl.style.left = `${nodeX - editorOffsets.x}px`;
  }, [editor, editorOffsets.x, editorOffsets.y, linkNode]);

  const [linkURL, setLinkURL] = useState(linkNode?.url);

  // update state if `linkNode` changes 
  useEffect(() => {
    setLinkURL(linkNode?.url);
  }, [linkNode]);

  const onLinkURLChange = useCallback(
    (event) => setLinkURL(event.target.value),
    [setLinkURL]
  );

  const closePopup = () => {
    // https://github.com/ianstormtaylor/slate/issues/3858
    Transforms.select(editor, {
      anchor: { path: [0, 0], offset: 0 },
      focus: { path: [0, 0], offset: 0 },
    });
  };

  const onApply = useCallback(
    (event) => {
      Transforms.setNodes(editor, { url: linkURL }, { at: path });
      closePopup();
    },
    [editor, linkURL, path]
  );

  const componentClasses = [
    'bg-white',
    'w-80',
    'p-2',
    'border',
    'border-slate-300',
    'rounded',
    'drop-shadow-sm',
    'absolute',
    'z-[1000]',
    ...(!isActive ? ['!hidden'] : []),
  ].join(' ');

  return (
    <div ref={linkEditorRef} className={componentClasses}>
      <div className="flex w-full justify-end mb-2">
        <MdClose className="text-slate-300 hover:cursor-pointer" onClick={closePopup} />
      </div>
      <InputText
        value={linkURL}
        isValidateUrl
        placeholder="https://"
        inputOnChange={onLinkURLChange}
      />
      <button
        className="w-full mt-3 text-white disabled:bg-gray-500 enabled:bg-blue-700 enabled:hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded text-sm px-2 py-1 text-center"
        disabled={!isUrl(linkURL)}
        onClick={onApply}
      >
        Submit
      </button>
    </div>
  );
};

export { LinkEditor };
