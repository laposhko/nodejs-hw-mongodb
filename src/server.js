import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import env from './utils/env.js';
import { initMongoDB } from './db/initMongoDB.js';
import { getAllContacts, getContactById } from './services/contacts.js';
const PORT = Number(env('PORT', '3000'));

// const { PORT = 3000 } = process.env;
function setupServer() {
  initMongoDB();
  const app = express();
  const logger = pino({ transport: { target: 'pino-pretty' } });
  app.use(logger);
  app.use(cors());

  //get all contacts
  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  //get contact by id
  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      res.status(404).json({
        message: 'Contact not found',
      });
      return;
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  });

  //error handle
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  //starting server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default setupServer;
