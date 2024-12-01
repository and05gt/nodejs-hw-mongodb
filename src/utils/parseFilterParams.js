const parseType = (value) => {
  if (typeof value !== 'string') {
    return;
  }

  if (['work', 'home', 'personal'].includes(value)) {
    return value;
  }

  return;
};

const parseIsFavourite = (value) => {
  if (typeof value !== 'string') {
    return;
  }

  return value === 'true' ? 'true' : 'false';
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = parseType(type);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
