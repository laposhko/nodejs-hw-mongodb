import { fieldList, sortOrderList } from '../constants/contacts-constants.js';
export const parseSortParams = ({ sortBy, sortOrder }) => {
  const parsedSortOrder = sortOrderList.includes(sortOrder) ? sortOrder : 'asc';
  const parsedSortBy = fieldList.includes(sortBy) ? sortBy : '_id';
  return { parsedSortBy, parsedSortOrder };
};
