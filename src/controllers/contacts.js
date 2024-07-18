import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  upsertContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseContactFilterParams } from '../utils/parseContactFilterParams.js';
// import { createContactSchema } from '../validation/contacts.js';

export const getAllContactsController = async (req, res) => {
  const { normalizedPage: page, normalizedPerPage: perPage } =
    parsePaginationParams(req.query);
  const { parsedSortBy: sortBy, parsedSortOrder: sortOrder } = parseSortParams(
    req.query,
  );
  const filter = parseContactFilterParams(req.query);
  const data = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    ...data,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  // const validationResult = await createContactSchema.validateAsync(req.body, {
  //   abortEarly: false,
  // });
  const contact = await createContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(204).json({
    status: 204,
    message: 'Successfully deleted a contact',
    data: contact,
  });
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await upsertContact(contactId, req.body, { upsert: true });
  if (!result) {
    next(createHttpError(404, 'Contact not found'));
  }
  const status = result.isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: `Successfully upserted a contact!`,
    data: result.contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await upsertContact(contactId, req.body);
  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};
