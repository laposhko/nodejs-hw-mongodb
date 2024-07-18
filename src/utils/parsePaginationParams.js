const normalizedNumber = (number, defaultValue) => {
  if (typeof number !== 'string') {
    number = defaultValue;
  }
  number = parseInt(number);

  if (Number.isNaN(number)) {
    number = defaultValue;
  }

  if (number <= 0) {
    number = defaultValue;
  }

  return number;
};
export const parsePaginationParams = ({ page, perPage }) => {
  const normalizedPage = normalizedNumber(page, 1);
  const normalizedPerPage = normalizedNumber(perPage, 5);
  return { normalizedPage, normalizedPerPage };
};
//{page: '6', perPage:'4'}
//returns object with numbers intead of strings
