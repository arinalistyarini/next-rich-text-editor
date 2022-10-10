import isUrl from "is-url";

const InputText = ({ value = '', inputOnChange = () => {}, isValidateUrl = false, isDisabled = false, placeholder = '' }) => {
  const componentClasses = [
    'py-1',
    'px-2',
    'bg-gray-50',
    'border',
    'text-gray-900',
    'text-sm',
    'rounded',
    'block',
    'w-full',
    ...(isValidateUrl && isUrl(value)) || !isValidateUrl ? ['border-gray-300'] : ['border-red-500'],
    ...(isValidateUrl && isUrl(value)) || !isValidateUrl ? ['focus:ring-blue-500'] : ['focus:ring-red-500'],
    ...(isValidateUrl && isUrl(value)) || !isValidateUrl ? ['focus:border-blue-500'] : ['focus:border-red-500'],
    ...(isValidateUrl && isUrl(value)) || !isValidateUrl ? ['focus:outline-blue-500'] : ['focus:outline-red-500'],
  ].join(' ');
  return (
    <input
      type="text"
      className={componentClasses}
      placeholder={placeholder}
      value={value}
      disabled={isDisabled}
      onChange={inputOnChange}
    />
  );
};

export { InputText };
