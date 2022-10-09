const setObjectState = (previousState, property, value) => {
  const result = { ...previousState };
  result[property] = value;
  return result;
};

export { setObjectState };
