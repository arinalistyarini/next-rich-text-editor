import { useEffect, useState } from 'react';

const useGetIcon = (icon) => {
  const [IconComponent, setIconComponent] = useState(null);
  useEffect(() => {
    async function getIcons() {
      const icons = await import(`react-icons/md`);

      if (icons[icon]) setIconComponent(icons[icon]());
    }
    getIcons();
  }, []);

  return IconComponent;
};

export { useGetIcon };
