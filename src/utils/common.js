const getDualFormat = (number) => {
  return number.toString().padStart(2, 0);
};

const getStringWithFirstCapitalLetter = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

const getIsoTimeFormat = (str) => {
  return `20${str.slice(6, 8)}-${str.slice(3, 5)}-${str.slice(0, 2)}T${str.slice(9, 14)}`;
};

export {getDualFormat, getStringWithFirstCapitalLetter, getIsoTimeFormat};
