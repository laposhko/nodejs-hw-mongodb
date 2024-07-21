import { ContactsCollection } from '../db/models/contact.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';
export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
}) => {
  const skip = (page - 1) * perPage;
  const databaseQuery = ContactsCollection.find();
  if (filter.userId) {
    databaseQuery.where('userId').equals(filter.userId);
  }
  if (filter.type) {
    databaseQuery.where('contactType').equals(filter.type);
  }
  if (filter.isFavorite) {
    databaseQuery.where('isFavorite').equals(filter.isFavorite);
  }
  const totalItems = await ContactsCollection.find()
    .merge(databaseQuery)
    .countDocuments();
  const contacts = await databaseQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });
  const { totalPages, hasNextPage, hasPrevPage } = calcPaginationData({
    totalItems,
    page,
    perPage,
  });
  return {
    contacts,
    totalItems,
    page,
    perPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
  };
};

export const getContact = async (contactId, userId) => {
  const contact = await ContactsCollection.findOne({ _id: contactId, userId });
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};

export const upsertContact = async (
  contactId,
  userId,
  payload,
  options = {},
) => {
  console.log(payload);
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;
  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
