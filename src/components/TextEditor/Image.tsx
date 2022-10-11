import { MdDelete } from "react-icons/md";
import { ReactEditor, useFocused, useSelected, useSlateStatic } from "slate-react"

import { removeImage } from "./helpers/removeImage";

const Image = ({ attributes, children, element }) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  const selected = useSelected();
  const focused = useFocused();

  const imageClasses = [
    'block',
    'max-h-[375px]',
    'max-w-[100%]',
    ...selected && focused ? ['shadow-[0_0_0_3px] shadow-blue-500'] : ['none'],
  ].join(' ');

  const buttonClasses = [
    ...selected && focused ? ['inline'] : ['hidden'],
    'absolute',
    'top-[0.5em]',
    'right-[0.5em]',
    'bg-white',
    'rounded',
    'drop-shadow-sm',
    'p-1'
  ].join(' ');

  return (
    <div {...attributes}>
      {children}
      <div
        contentEditable={false}
        className='relative inline-block'
      >
        <img
          src={element.url}
          className={imageClasses}
        />
        <button
          className={buttonClasses}
          onMouseDown={() => { removeImage(editor, path); }}
        >
          <MdDelete />
        </button>
      </div>
    </div>
  )
}

export { Image };
