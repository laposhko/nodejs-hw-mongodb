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
  if (filter.type) {
    databaseQuery.where('contactType').equals(filter.type);
  }
  if (filter.isFavorite) {
    databaseQuery.where('isFavorite').equals(filter.isFavorite);
  }
  const contacts = await databaseQuery
    .find()
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const totalItems = await ContactsCollection.find()
    .merge(databaseQuery)
    .countDocuments();
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

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });
  return contact;
};

export const upsertContact = async (contactId, payload, options = {}) => {
  const rawResult = await ContactsCollection.findByIdAndUpdate(
    { _id: contactId },
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
