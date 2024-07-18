import { contactTypes } from '../constants/contacts-constants.js';
const parseBoolean = (value) => {
  if (typeof value !== 'string') return;
  if (!['true', 'false'].includes(value)) return;
  return Boolean(value);
};
export const parseContactFilterParams = ({ type, isFavorite }) => {
  const parsedType = contactTypes.includes(type) ? type : null;
  const parsedIsFavorite = parseBoolean(isFavorite);
  return { type: parsedType, isFavorite: parsedIsFavorite };
};
