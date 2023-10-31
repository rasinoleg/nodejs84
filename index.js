const { Command } = require('commander');
const program = new Command();
const { listContacts, getContactById, removeContact, addContact } = require('./contacts');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await listContacts();
      
      console.table(contacts);
      break;

    case 'get':
      if (!id) {
        console.log('Не вказано ID контакту.');
        break;
      }
      const contact = await getContactById(id);
      if (contact) {
       
        console.table([contact]);
      } else {
        console.log('Контакт не знайдений.');
      }
      break;

    case 'add':
      if (!name || !email || !phone) {
        console.log (name, email, phone);
        break;
      }
      const newContact = await addContact(name, email, phone);
     
      console.table([newContact]);
      break;

    case 'remove':
      if (!id) {
        
        break;
      }
      const removedContact = await removeContact(id);
      if (removedContact) {
        
        console.table([removedContact]);
      } else {
        console.log('Contact not found for deletion.');
      }
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
