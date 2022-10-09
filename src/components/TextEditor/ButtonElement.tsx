import { useEffect } from 'react';
import { useSlate } from 'slate-react';

import { isMarkActive } from './helpers/isMarkActive';
import { toggleMark } from './helpers/toggleMark';
import { useButtonClassNames } from './hooks/useButtonClassNames';
import { useGetIcon } from './hooks/useGetIcon';

const ButtonElement = ({ icon, format, isIconShown }) => {
  const slateEditor = useSlate();

  const IconComponent = useGetIcon(icon);
  useEffect(() => {
    isIconShown(format, !!IconComponent);
  }, [IconComponent]);

  const isActive = isMarkActive(slateEditor, format);

  const buttonOnClick = (event) => {
    event.preventDefault();
    toggleMark(slateEditor, format);
  };

  const buttonClasses = useButtonClassNames(isActive, !!IconComponent);

  return (
    <button className={buttonClasses} onMouseDown={buttonOnClick}>
      {IconComponent}
    </button>
  );
};

export { ButtonElement };
