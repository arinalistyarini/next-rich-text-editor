const useButtonClassNames = (isActive: Boolean, isIconShown: Boolean) => {
  const classList = [
    'p-3',
    'hover:bg-slate-100',
    ...(!isActive ? ['text-gray-400'] : []),
    ...(!isIconShown ? ['hidden'] : []),
  ];
  return classList.join(' ');
};

export { useButtonClassNames };
