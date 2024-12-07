import { SORT_ORDER } from '../constants/index.js';
import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
  userId,
}) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactsQuery = ContactsCollection.find({ userId });

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }

  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, page, perPage);
  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = (contactId, userId) => {
  const contactById = ContactsCollection.findOne({
    _id: contactId,
    userId,
  });
  return contactById;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload) => {
  const result = await ContactsCollection.findByIdAndUpdate(
    contactId,
    payload,
    { new: true },
  );
  return result;
};

export const deleteContact = async (contactId) => {
  const result = await ContactsCollection.findByIdAndDelete(contactId);
  return result;
};
